import { Response, NextFunction } from 'express';
import { Competition } from '../models/Competition';
import { Participation } from '../models/Participation';
import { AuthRequest, ParticipationStatus, PaymentStatus } from '../types';
import {
  AppError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} from '../utils/AppError';
import { isRegistrationAllowed } from '../services/competitionService';

/**
 * POST /api/competitions/:id/register
 * Register the authenticated user for a competition.
 *
 * CONCURRENCY-SAFE: Uses MongoDB atomic findOneAndUpdate with $inc
 * to prevent race conditions when multiple users register simultaneously.
 */
export const registerForCompetition = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('You must be logged in to register.');
    }

    const competitionId = req.params.id;
    const userId = req.user._id;

    // Step 1: Check if user is already registered (fast check before atomic op)
    const existingParticipation = await Participation.findOne({
      competitionId,
      userId,
    });

    if (existingParticipation) {
      throw new ConflictError('You are already registered for this competition.');
    }

    // Step 2: Find the competition first to validate dates
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      throw new NotFoundError('Competition');
    }

    // Step 3: Check if registration is allowed (date-based)
    const registrationCheck = isRegistrationAllowed(competition);
    if (!registrationCheck.allowed) {
      throw new AppError(registrationCheck.reason!, 400);
    }

    // Step 4: ATOMIC operation - increment participantCount only if spots available
    // This is the critical concurrency-safe operation.
    // If maxParticipants = 100 and participantCount = 99, only ONE concurrent
    // request will succeed in incrementing to 100.
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        participantCount: { $lt: competition.maxParticipants }, // Atomic guard
      },
      {
        $inc: { participantCount: 1 },
      },
      { new: true }
    );

    if (!updatedCompetition) {
      throw new AppError(
        'Competition is full. No spots remaining.',
        409
      );
    }

    // Step 5: Create participation record
    // The unique compound index (competitionId + userId) provides a
    // second safety net against duplicate registrations.
    try {
      const participation = await Participation.create({
        userId,
        competitionId,
        status: ParticipationStatus.REGISTERED,
        joinedAt: new Date(),
        paymentStatus: PaymentStatus.COMPLETED, // Demo: auto-complete
      });

      res.status(201).json({
        success: true,
        data: {
          participation,
          competition: {
            participantCount: updatedCompetition.participantCount,
            remainingSpots: Math.max(
              0,
              updatedCompetition.maxParticipants - updatedCompetition.participantCount
            ),
          },
        },
        message: 'Successfully registered for the competition!',
      });
    } catch (err: any) {
      // If participation creation fails (e.g., duplicate), rollback the count
      await Competition.findByIdAndUpdate(competitionId, {
        $inc: { participantCount: -1 },
      });

      if (err.code === 11000) {
        throw new ConflictError(
          'You are already registered for this competition.'
        );
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/competitions/:id/participation
 * Check if the current user is registered for a competition.
 */
export const getParticipation = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const participation = await Participation.findOne({
      competitionId: req.params.id,
      userId: req.user._id,
    });

    res.json({
      success: true,
      data: {
        isRegistered: !!participation,
        participation: participation || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/competitions/:id/register
 * Cancel registration for a competition.
 */
export const cancelRegistration = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const competitionId = req.params.id;
    const userId = req.user._id;

    const participation = await Participation.findOneAndDelete({
      competitionId,
      userId,
      status: ParticipationStatus.REGISTERED, // Can only cancel if just registered
    });

    if (!participation) {
      throw new NotFoundError('Registration');
    }

    // Atomically decrement participant count
    await Competition.findByIdAndUpdate(competitionId, {
      $inc: { participantCount: -1 },
    });

    res.json({
      success: true,
      message: 'Registration cancelled successfully.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/submissions
 * Get all participations/submissions for the current authenticated user.
 */
export const getUserParticipations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const participations = await Participation.find({ userId: req.user._id })
      .populate('competitionId')
      .sort({ joinedAt: -1 });

    res.json({
      success: true,
      data: {
        participations,
      },
    });
  } catch (error) {
    next(error);
  }
};
