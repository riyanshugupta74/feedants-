import mongoose, { Schema } from 'mongoose';
import { ICompetition, CompetitionStatus } from '../types';

const judgeSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    experience: { type: String, required: true },
    image: { type: String, required: true },
    introVideo: { type: String, default: '' },
  },
  { _id: false }
);

const previousWinnerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    position: { type: String, required: true },
    image: { type: String, required: true },
    videoUrl: { type: String, default: '' },
  },
  { _id: false }
);

const judgingParameterSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    weightage: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false }
);

const rewardSchema = new Schema(
  {
    position: { type: Number, required: true },
    label: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const competitionSchema = new Schema<ICompetition>(
  {
    title: {
      type: String,
      required: [true, 'Competition title is required'],
      trim: true,
      maxlength: [200, 'Title must be at most 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [5000, 'Description must be at most 5000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    prizePool: {
      type: Number,
      required: [true, 'Prize pool is required'],
      min: [0, 'Prize pool must be non-negative'],
    },
    entryFee: {
      type: Number,
      required: [true, 'Entry fee is required'],
      min: [0, 'Entry fee must be non-negative'],
    },
    maxParticipants: {
      type: Number,
      required: [true, 'Max participants is required'],
      min: [1, 'Must allow at least 1 participant'],
    },
    participantCount: {
      type: Number,
      default: 0,
      min: [0, 'Participant count cannot be negative'],
    },
    registrationStart: {
      type: Date,
      required: [true, 'Registration start date is required'],
    },
    registrationEnd: {
      type: Date,
      required: [true, 'Registration end date is required'],
    },
    submissionStart: {
      type: Date,
      required: [true, 'Submission start date is required'],
    },
    submissionEnd: {
      type: Date,
      required: [true, 'Submission end date is required'],
    },
    resultDate: {
      type: Date,
      required: [true, 'Result date is required'],
    },
    status: {
      type: String,
      enum: Object.values(CompetitionStatus),
      default: CompetitionStatus.UPCOMING,
    },
    judge: {
      type: judgeSchema,
      required: [true, 'Judge information is required'],
    },
    previousWinners: {
      type: [previousWinnerSchema],
      default: [],
    },
    judgingParameters: {
      type: [judgingParameterSchema],
      default: [],
    },
    rules: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: [String],
      default: [],
    },
    rewards: {
      type: [rewardSchema],
      default: [],
    },
    aboutCompetition: {
      type: String,
      default: '',
    },
    winnerCertificate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Virtual: computed status based on dates and capacity
competitionSchema.virtual('computedStatus').get(function () {
  const now = new Date();

  if (this.participantCount >= this.maxParticipants) {
    return CompetitionStatus.FULL;
  }
  if (now < this.registrationStart) {
    return CompetitionStatus.UPCOMING;
  }
  if (now >= this.registrationStart && now <= this.registrationEnd) {
    return CompetitionStatus.REGISTRATION_OPEN;
  }
  if (now > this.registrationEnd && now < this.submissionStart) {
    return CompetitionStatus.REGISTRATION_CLOSED;
  }
  if (now >= this.submissionStart && now <= this.submissionEnd) {
    return CompetitionStatus.SUBMISSION_OPEN;
  }
  if (now > this.submissionEnd && now < this.resultDate) {
    return CompetitionStatus.SUBMISSION_CLOSED;
  }
  if (now >= this.resultDate) {
    return CompetitionStatus.RESULT_DECLARED;
  }
  return CompetitionStatus.UPCOMING;
});

// Virtual: remaining spots
competitionSchema.virtual('remainingSpots').get(function () {
  return Math.max(0, this.maxParticipants - this.participantCount);
});

// Indexes
competitionSchema.index({ category: 1 });
competitionSchema.index({ status: 1 });
competitionSchema.index({ registrationEnd: 1 });

export const Competition = mongoose.model<ICompetition>(
  'Competition',
  competitionSchema
);
