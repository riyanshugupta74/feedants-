import { Request, Response, NextFunction } from 'express';
import { validationResult, body, param } from 'express-validator';
import { ValidationError } from '../utils/AppError';
import mongoose from 'mongoose';

/**
 * Middleware to check validation results from express-validator.
 */
export const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err: any) => ({
      field: err.path,
      message: err.msg,
    }));
    throw new ValidationError('Validation failed', formattedErrors);
  }
  next();
};

/**
 * Validate MongoDB ObjectId parameter.
 */
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ValidationError(`Invalid ${paramName} format`);
    }
    next();
  };
};

// ─── Auth Validators ───────────────────────────────────────────

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

// ─── Competition Validators ────────────────────────────────────

export const validateCompetitionId = [
  param('id')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid competition ID'),
  handleValidationErrors,
];

export const validateCreateCompetition = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 5000 }).withMessage('Description must be at most 5000 characters'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('prizePool')
    .isNumeric().withMessage('Prize pool must be a number')
    .custom((val) => val >= 0).withMessage('Prize pool cannot be negative'),
  body('entryFee')
    .isNumeric().withMessage('Entry fee must be a number')
    .custom((val) => val >= 0).withMessage('Entry fee cannot be negative'),
  body('maxParticipants')
    .isInt({ min: 1 }).withMessage('Max participants must be at least 1'),
  body('image')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Image must be a valid URL'),
  handleValidationErrors,
];
