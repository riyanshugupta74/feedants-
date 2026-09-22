import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/AppError';

/**
 * Centralized error handling middleware.
 * Transforms all errors into a consistent JSON response format.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default values
  let statusCode = 500;
  let message = 'Internal server error';
  let errors: any[] = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    if (err instanceof ValidationError) {
      errors = err.errors;
    }
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    const mongooseErr = err as any;
    errors = Object.values(mongooseErr.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Mongoose duplicate key error
  if ((err as any).code === 11000) {
    statusCode = 409;
    const keyValue = (err as any).keyValue;
    const field = Object.keys(keyValue)[0];
    message = `Duplicate value for ${field}. This ${field} already exists.`;
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', {
      statusCode,
      message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler for unknown routes.
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};
