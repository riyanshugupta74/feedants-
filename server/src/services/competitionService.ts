import { ICompetition, CompetitionStatus } from '../types';

/**
 * Compute the dynamic status of a competition based on dates and capacity.
 */
export const computeCompetitionStatus = (
  competition: ICompetition
): CompetitionStatus => {
  const now = new Date();

  // Check if full first (takes priority)
  if (competition.participantCount >= competition.maxParticipants) {
    return CompetitionStatus.FULL;
  }

  if (now < competition.registrationStart) {
    return CompetitionStatus.UPCOMING;
  }

  if (now >= competition.registrationStart && now <= competition.registrationEnd) {
    return CompetitionStatus.REGISTRATION_OPEN;
  }

  if (now > competition.registrationEnd && now < competition.submissionStart) {
    return CompetitionStatus.REGISTRATION_CLOSED;
  }

  if (now >= competition.submissionStart && now <= competition.submissionEnd) {
    return CompetitionStatus.SUBMISSION_OPEN;
  }

  if (now > competition.submissionEnd && now < competition.resultDate) {
    return CompetitionStatus.SUBMISSION_CLOSED;
  }

  if (now >= competition.resultDate) {
    return CompetitionStatus.RESULT_DECLARED;
  }

  return CompetitionStatus.UPCOMING;
};

/**
 * Check if registration is currently allowed for a competition.
 */
export const isRegistrationAllowed = (
  competition: ICompetition
): { allowed: boolean; reason?: string } => {
  const now = new Date();

  if (competition.participantCount >= competition.maxParticipants) {
    return { allowed: false, reason: 'Competition is full. No spots remaining.' };
  }

  if (now < competition.registrationStart) {
    return { allowed: false, reason: 'Registration has not started yet.' };
  }

  if (now > competition.registrationEnd) {
    return { allowed: false, reason: 'Registration period has ended.' };
  }

  return { allowed: true };
};

/**
 * Check if submissions are currently allowed.
 */
export const isSubmissionAllowed = (
  competition: ICompetition
): { allowed: boolean; reason?: string } => {
  const now = new Date();

  // Allow early submissions (e.g., right after registration)
  if (now > competition.submissionEnd) {
    return { allowed: false, reason: 'Submission period has ended.' };
  }

  return { allowed: true };
};
