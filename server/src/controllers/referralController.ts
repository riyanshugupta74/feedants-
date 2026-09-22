import { Response, NextFunction } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../types';
import { UnauthorizedError } from '../utils/AppError';

/**
 * GET /api/referrals
 * Get the current user's referral information.
 */
export const getReferralInfo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const user = req.user;

    res.json({
      success: true,
      data: {
        referralCode: user.referralCode,
        referralLink: `https://feedants.com/r/${user.referralCode}`,
        referralEarnings: user.referralEarnings,
        earningsPerReferral: 10, // ₹10 per referral
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/referrals/:competitionId
 * Generate/get referral link for a specific competition.
 */
export const getCompetitionReferral = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const { competitionId } = req.params;
    const user = req.user;

    const referralLink = `https://feedants.com/r/${user.referralCode}?comp=${competitionId}`;

    res.json({
      success: true,
      data: {
        referralLink,
        referralCode: user.referralCode,
        earningsPerReferral: 10,
      },
    });
  } catch (error) {
    next(error);
  }
};
