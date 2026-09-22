import mongoose, { Schema } from 'mongoose';
import { IParticipation, ParticipationStatus, PaymentStatus, SubmissionStatus } from '../types';

const participationSchema = new Schema<IParticipation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    competitionId: {
      type: Schema.Types.ObjectId,
      ref: 'Competition',
      required: [true, 'Competition ID is required'],
    },
    status: {
      type: String,
      enum: Object.values(ParticipationStatus),
      default: ParticipationStatus.REGISTERED,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.COMPLETED, // For demo, auto-complete payment
    },
    submissionStatus: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.NOT_SUBMITTED,
    },
    submissionUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// CRITICAL: Unique compound index to prevent duplicate registrations
participationSchema.index(
  { competitionId: 1, userId: 1 },
  { unique: true }
);

// Additional indexes for common queries
participationSchema.index({ userId: 1 });
participationSchema.index({ competitionId: 1, status: 1 });

export const Participation = mongoose.model<IParticipation>(
  'Participation',
  participationSchema
);
