import { Request, Response, NextFunction } from 'express';
import { Competition } from '../models/Competition';
import { computeCompetitionStatus } from '../services/competitionService';
import { NotFoundError } from '../utils/AppError';

/**
 * GET /api/competitions
 * List all competitions with optional filtering and pagination.
 */
export const getCompetitions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = '1',
      limit = '10',
      category,
      status,
      search,
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build query filter
    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [competitions, total] = await Promise.all([
      Competition.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Competition.countDocuments(filter),
    ]);

    // Add computed status to each competition
    const competitionsWithStatus = competitions.map((comp: any) => ({
      ...comp,
      computedStatus: computeCompetitionStatus(comp),
      remainingSpots: Math.max(0, comp.maxParticipants - comp.participantCount),
    }));

    res.json({
      success: true,
      data: {
        competitions: competitionsWithStatus,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/competitions/:id
 * Get full competition details by ID.
 */
export const getCompetitionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const competition = await Competition.findById(req.params.id).lean();

    if (!competition) {
      throw new NotFoundError('Competition');
    }

    // Add computed fields
    const competitionWithStatus = {
      ...competition,
      computedStatus: computeCompetitionStatus(competition as any),
      remainingSpots: Math.max(
        0,
        competition.maxParticipants - competition.participantCount
      ),
    };

    res.json({
      success: true,
      data: {
        competition: competitionWithStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/competitions
 * Create a new competition.
 */
export const createCompetition = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      title,
      description,
      category,
      prizePool,
      entryFee,
      maxParticipants,
      image,
      registrationStart: bodyRegStart,
      registrationEnd: bodyRegEnd,
      submissionStart: bodySubStart,
      submissionEnd: bodySubEnd,
      resultDate: bodyResultDate,
    } = req.body;

    // Use current time to set default lifecycle dates for a new competition
    const now = new Date();
    const registrationStart = bodyRegStart ? new Date(bodyRegStart) : new Date(now);
    const registrationEnd = bodyRegEnd ? new Date(bodyRegEnd) : new Date(now);
    if (!bodyRegEnd) registrationEnd.setDate(registrationEnd.getDate() + 7);
    
    const submissionStart = bodySubStart ? new Date(bodySubStart) : new Date(registrationEnd);
    const submissionEnd = bodySubEnd ? new Date(bodySubEnd) : new Date(submissionStart);
    if (!bodySubEnd) submissionEnd.setDate(submissionEnd.getDate() + 14);
    
    const resultDate = bodyResultDate ? new Date(bodyResultDate) : new Date(submissionEnd);
    if (!bodyResultDate) resultDate.setDate(resultDate.getDate() + 7);

    const newCompetition = await Competition.create({
      title,
      description,
      category,
      prizePool,
      entryFee,
      maxParticipants,
      image: image || 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800',
      registrationStart,
      registrationEnd,
      submissionStart,
      submissionEnd,
      resultDate,
      judge: {
        name: 'Community Judge',
        title: 'Expert',
        experience: '10+ Years',
        image: 'https://randomuser.me/api/portraits/women/75.jpg',
      }
    });

    res.status(201).json({
      success: true,
      data: {
        competition: newCompetition,
      },
    });
  } catch (error) {
    next(error);
  }
};
