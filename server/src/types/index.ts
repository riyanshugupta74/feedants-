import { Request } from 'express';
import { Document, Types } from 'mongoose';

// ─── Competition Status ────────────────────────────────────────
export enum CompetitionStatus {
  UPCOMING = 'UPCOMING',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  REGISTRATION_CLOSED = 'REGISTRATION_CLOSED',
  FULL = 'FULL',
  SUBMISSION_OPEN = 'SUBMISSION_OPEN',
  SUBMISSION_CLOSED = 'SUBMISSION_CLOSED',
  RESULT_DECLARED = 'RESULT_DECLARED',
}

// ─── Participation Status ──────────────────────────────────────
export enum ParticipationStatus {
  REGISTERED = 'REGISTERED',
  SUBMITTED = 'SUBMITTED',
  WINNER = 'WINNER',
  DISQUALIFIED = 'DISQUALIFIED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum SubmissionStatus {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

// ─── Sub-document Interfaces ───────────────────────────────────
export interface IJudge {
  name: string;
  title: string;
  experience: string;
  image: string;
  introVideo?: string;
}

export interface IPreviousWinner {
  userId?: Types.ObjectId;
  name: string;
  position: string;
  image: string;
  videoUrl?: string;
}

export interface IJudgingParameter {
  name: string;
  description: string;
  weightage: number;
}

export interface IReward {
  position: number;
  label: string;
  amount: number;
}

// ─── Model Interfaces ──────────────────────────────────────────
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  phone?: string;
  referralCode?: string;
  referralEarnings: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ICompetition extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  prizePool: number;
  entryFee: number;
  maxParticipants: number;
  participantCount: number;
  registrationStart: Date;
  registrationEnd: Date;
  submissionStart: Date;
  submissionEnd: Date;
  resultDate: Date;
  status: CompetitionStatus;
  judge: IJudge;
  previousWinners: IPreviousWinner[];
  judgingParameters: IJudgingParameter[];
  rules: string[];
  eligibility: string[];
  rewards: IReward[];
  aboutCompetition: string;
  winnerCertificate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IParticipation extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  competitionId: Types.ObjectId;
  status: ParticipationStatus;
  joinedAt: Date;
  paymentStatus: PaymentStatus;
  submissionStatus: SubmissionStatus;
  submissionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Auth Types ────────────────────────────────────────────────
export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JWTPayload {
  userId: string;
  email: string;
}

// ─── API Response ──────────────────────────────────────────────
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}
