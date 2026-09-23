import mongoose from 'mongoose';
import { User } from '../models/User';
import { Competition } from '../models/Competition';
import { Participation } from '../models/Participation';
import { connectDatabase } from '../config/database';
import { CompetitionStatus, ParticipationStatus, PaymentStatus } from '../types';

const seed = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('🌱 Starting database seed...\n');

    await Promise.all([
      User.deleteMany({}),
      Competition.deleteMany({}),
      Participation.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@feedants.com',
      password: 'Demo@123',
      profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      phone: '+91 9876543210',
      referralCode: 'referral123',
      referralEarnings: 50,
    });
    console.log('👤 Created demo user');

    const winnerUsers = await User.insertMany([
      { name: 'Riya Shah', email: 'riya@f.com', password: 'Pass@123', profileImage: 'https://randomuser.me/api/portraits/women/44.jpg', phone: '+91 9876543211' },
      { name: 'Aarav Mehta', email: 'aarav@f.com', password: 'Pass@123', profileImage: 'https://randomuser.me/api/portraits/men/45.jpg', phone: '+91 9876543212' },
      { name: 'Neha Verma', email: 'neha@f.com', password: 'Pass@123', profileImage: 'https://randomuser.me/api/portraits/women/68.jpg', phone: '+91 9876543213' },
      { name: 'Ishita Chauhan', email: 'ishita@f.com', password: 'Pass@123', profileImage: 'https://randomuser.me/api/portraits/women/55.jpg', phone: '+91 9876543214' },
    ]);
    
    const now = new Date();
    
    // Dates for REGISTRATION_OPEN
    const openStart = new Date(now); openStart.setDate(now.getDate() - 3);
    const openEnd = new Date(now); openEnd.setDate(now.getDate() + 5);
    const openSubStart = new Date(openEnd); openSubStart.setDate(openSubStart.getDate() + 1);
    const openSubEnd = new Date(openSubStart); openSubEnd.setDate(openSubStart.getDate() + 14);
    const openRes = new Date(openSubEnd); openRes.setDate(openRes.getDate() + 7);

    // Dates for UPCOMING
    const upStart = new Date(now); upStart.setDate(now.getDate() + 5);
    const upEnd = new Date(upStart); upEnd.setDate(upStart.getDate() + 10);
    const upSubStart = new Date(upEnd); upSubStart.setDate(upEnd.getDate() + 1);
    const upSubEnd = new Date(upSubStart); upSubEnd.setDate(upSubStart.getDate() + 14);
    const upRes = new Date(upSubEnd); upRes.setDate(upSubEnd.getDate() + 7);

    // Dates for SUBMISSION_OPEN (LIVE)
    const liveStart = new Date(now); liveStart.setDate(now.getDate() - 15);
    const liveEnd = new Date(now); liveEnd.setDate(now.getDate() - 5);
    const liveSubStart = new Date(now); liveSubStart.setDate(now.getDate() - 2);
    const liveSubEnd = new Date(now); liveSubEnd.setDate(now.getDate() + 10);
    const liveRes = new Date(liveSubEnd); liveRes.setDate(liveSubEnd.getDate() + 7);

    // Dates for COMPLETED
    const compStart = new Date(now); compStart.setDate(now.getDate() - 45);
    const compEnd = new Date(compStart); compEnd.setDate(compStart.getDate() + 10);
    const compSubStart = new Date(compEnd); compSubStart.setDate(compEnd.getDate() + 1);
    const compSubEnd = new Date(compSubStart); compSubEnd.setDate(compSubStart.getDate() + 14);
    const compRes = new Date(now); compRes.setDate(now.getDate() - 2);

    const competitions = [
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000000'),
        title: 'Feedants Classical Dance',
        description: 'Online classical dance competition open for all age groups.',
        category: 'Dance',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=800',
        prizePool: 1500,
        entryFee: 99,
        maxParticipants: 100,
        participantCount: 81,
        registrationStart: openStart, registrationEnd: openEnd, submissionStart: openSubStart, submissionEnd: openSubEnd, resultDate: openRes,
        status: CompetitionStatus.REGISTRATION_OPEN,
      },
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000001'),
        title: 'Battle of the Bands',
        description: 'Showcase your band\'s musical talent in this nationwide event.',
        category: 'Music',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
        prizePool: 5000,
        entryFee: 299,
        maxParticipants: 50,
        participantCount: 50,
        registrationStart: liveStart, registrationEnd: liveEnd, submissionStart: liveSubStart, submissionEnd: liveSubEnd, resultDate: liveRes,
        status: CompetitionStatus.SUBMISSION_OPEN,
      },
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000002'),
        title: 'National Photography Challenge',
        description: 'Capture the essence of nature in our annual photography challenge.',
        category: 'Photography',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
        prizePool: 800,
        entryFee: 49,
        maxParticipants: 200,
        participantCount: 0,
        registrationStart: upStart, registrationEnd: upEnd, submissionStart: upSubStart, submissionEnd: upSubEnd, resultDate: upRes,
        status: CompetitionStatus.UPCOMING,
      },
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000003'),
        title: 'Full Stack Coding Challenge',
        description: 'Build a fully functional web app in 48 hours.',
        category: 'Coding',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        prizePool: 3000,
        entryFee: 0, // Free entry
        maxParticipants: 500,
        participantCount: 120,
        registrationStart: openStart, registrationEnd: openEnd, submissionStart: openSubStart, submissionEnd: openSubEnd, resultDate: openRes,
        status: CompetitionStatus.REGISTRATION_OPEN,
      },
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000004'),
        title: 'UI/UX Design Challenge',
        description: 'Redesign a popular app and win exclusive design software licenses.',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        prizePool: 1200,
        entryFee: 49,
        maxParticipants: 50,
        participantCount: 50, // Full
        registrationStart: openStart, registrationEnd: openEnd, submissionStart: openSubStart, submissionEnd: openSubEnd, resultDate: openRes,
        status: CompetitionStatus.REGISTRATION_OPEN, // But participantCount = maxParticipants, virtual should handle FULL
      },
      {
        _id: new mongoose.Types.ObjectId('600000000000000000000005'),
        title: 'Digital Art Competition',
        description: 'Create stunning digital artworks based on the theme "Cyberpunk".',
        category: 'Art',
        image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800',
        prizePool: 2000,
        entryFee: 99,
        maxParticipants: 150,
        participantCount: 145,
        registrationStart: compStart, registrationEnd: compEnd, submissionStart: compSubStart, submissionEnd: compSubEnd, resultDate: compRes,
        status: CompetitionStatus.RESULT_DECLARED,
      },
    ].map(comp => ({
      ...comp,
      judge: { name: 'Judge', title: 'Expert', experience: '10+ Years', image: 'https://randomuser.me/api/portraits/women/75.jpg' },
      previousWinners: [
        { name: 'Arjun', position: '1st Place', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Priya', position: '2nd Place', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Rohan', position: '3rd Place', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
      ],
      judgingParameters: [{ name: 'Creativity', description: 'Originality', weightage: 100 }],
      rules: ['Rule 1', 'Rule 2'],
      eligibility: ['Open to all'],
      rewards: [{ position: 1, label: '1st Winner', amount: comp.prizePool }],
      aboutCompetition: comp.description,
    }));

    await Competition.insertMany(competitions);
    console.log(`🏆 Created ${competitions.length} competitions`);

    for (const winnerUser of winnerUsers) {
      await Participation.create({
        userId: winnerUser._id,
        competitionId: competitions[0]._id,
        status: ParticipationStatus.REGISTERED,
        joinedAt: new Date(),
        paymentStatus: PaymentStatus.COMPLETED,
      });
    }

    console.log('✅ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
