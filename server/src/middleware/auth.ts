import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { env } from '../config/env';
import { AuthRequest, JWTPayload } from '../types';
import { UnauthorizedError } from '../utils/AppError';

/**
 * Required authentication middleware.
 * Verifies JWT token and attaches user to request.
 */
export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided. Please log in.');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedError('User no longer exists.');
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return next(new UnauthorizedError('Invalid token.'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Token expired. Please log in again.'));
    }
    next(error);
  }
};

/**
 * Optional authentication middleware.
 * If a valid token is present, attaches user to request.
 * If no token or invalid token, continues without user.
 */
export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = user;
    }

    next();
  } catch {
    // Silently continue without user for optional auth
    next();
  }
};

/**
 * Generate JWT token for a user.
 */
export const generateToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email } as JWTPayload,
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );
};
