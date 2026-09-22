export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
}

export interface ApiError {
  field?: string;
  message: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ─── Participation ─────────────────────────────────────────────
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

export interface Participation {
  _id: string;
  userId: string;
  competitionId: string;
  status: ParticipationStatus;
  joinedAt: string;
  paymentStatus: PaymentStatus;
  submissionStatus: SubmissionStatus;
  submissionUrl?: string;
  createdAt: string;
  updatedAt: string;
}
