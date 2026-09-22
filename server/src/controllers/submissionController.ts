import { Response, NextFunction } from 'express';
import { Participation } from '../models/Participation';
import { Competition } from '../models/Competition';
import { AuthRequest, SubmissionStatus } from '../types';
import { AppError, NotFoundError, UnauthorizedError } from '../utils/AppError';
import { isSubmissionAllowed } from '../services/competitionService';

/**
 * POST /api/competitions/:id/submission
 * Submit an entry for a competition.
 */
export const submitEntry = async (
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
    const { submissionUrl } = req.body;

    if (!submissionUrl) {
      throw new AppError('Submission URL is required.', 400);
    }

    // Check competition exists
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      throw new NotFoundError('Competition');
    }

    // Check submission is allowed
    const submissionCheck = isSubmissionAllowed(competition);
    if (!submissionCheck.allowed) {
      throw new AppError(submissionCheck.reason!, 400);
    }

    // Check user is registered
    const participation = await Participation.findOne({
      competitionId,
      userId,
    });

    if (!participation) {
      throw new AppError(
        'You must be registered for this competition to submit.',
        400
      );
    }

    // Check if already submitted
    if (participation.submissionStatus === SubmissionStatus.SUBMITTED) {
      throw new AppError('You have already submitted your entry.', 409);
    }

    // Update participation with submission
    participation.submissionUrl = submissionUrl;
    participation.submissionStatus = SubmissionStatus.SUBMITTED;
    await participation.save();

    res.json({
      success: true,
      data: {
        participation,
      },
      message: 'Submission uploaded successfully!',
    });
  } catch (error) {
    next(error);
  }
};
