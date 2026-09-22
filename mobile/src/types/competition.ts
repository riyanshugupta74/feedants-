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

// ─── Sub-types ─────────────────────────────────────────────────
export interface Judge {
  name: string;
  title: string;
  experience: string;
  image: string;
  introVideo?: string;
}

export interface PreviousWinner {
  userId?: string;
  name: string;
  position: string;
  image: string;
  videoUrl?: string;
}

export interface JudgingParameter {
  name: string;
  description: string;
  weightage: number;
}

export interface Reward {
  position: number;
  label: string;
  amount: number;
}

// ─── Competition ───────────────────────────────────────────────
export interface Competition {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  prizePool: number;
  entryFee: number;
  maxParticipants: number;
  participantCount: number;
  registrationStart: string;
  registrationEnd: string;
  submissionStart: string;
  submissionEnd: string;
  resultDate: string;
  status: CompetitionStatus;
  computedStatus: CompetitionStatus;
  remainingSpots: number;
  judge: Judge;
  previousWinners: PreviousWinner[];
  judgingParameters: JudgingParameter[];
  rules: string[];
  eligibility: string[];
  rewards: Reward[];
  aboutCompetition: string;
  winnerCertificate: boolean;
  createdAt: string;
  updatedAt: string;
}
