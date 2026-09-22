import app from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { exec } from 'child_process';

let server: any;

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // TEMPORARY SEED ROUTE TO BYPASS ISP BLOCKS
    app.get('/api/seed', async (req, res) => {
      try {
        const { User } = require('./models/User');
        const { Competition } = require('./models/Competition');
        const { Participation } = require('./models/Participation');
        
        await Promise.all([
          User.deleteMany({}),
          Competition.deleteMany({}),
          Participation.deleteMany({}),
        ]);

        const mongoose = require('mongoose');
        const { CompetitionStatus } = require('./types');

        // Just create 2 basic dummy competitions for testing to prove it works
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
            registrationStart: new Date(Date.now() - 86400000 * 3), 
            registrationEnd: new Date(Date.now() + 86400000 * 5),
            submissionStart: new Date(Date.now() + 86400000 * 6),
            submissionEnd: new Date(Date.now() + 86400000 * 20),
            resultDate: new Date(Date.now() + 86400000 * 27),
            status: CompetitionStatus.REGISTRATION_OPEN,
            judge: { name: 'Judge', title: 'Expert', experience: '10+ Years', image: 'https://randomuser.me/api/portraits/women/75.jpg' },
            previousWinners: [],
            judgingParameters: [{ name: 'Creativity', description: 'Originality', weightage: 100 }],
            rules: ['Rule 1', 'Rule 2'],
            eligibility: ['Open to all'],
            rewards: [{ position: 1, label: '1st Winner', amount: 1500 }],
            aboutCompetition: 'Online classical dance competition.',
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
            registrationStart: new Date(Date.now() - 86400000 * 15),
            registrationEnd: new Date(Date.now() - 86400000 * 5),
            submissionStart: new Date(Date.now() - 86400000 * 2),
            submissionEnd: new Date(Date.now() + 86400000 * 10),
            resultDate: new Date(Date.now() + 86400000 * 17),
            status: CompetitionStatus.SUBMISSION_OPEN,
            judge: { name: 'Judge', title: 'Expert', experience: '10+ Years', image: 'https://randomuser.me/api/portraits/women/75.jpg' },
            previousWinners: [],
            judgingParameters: [{ name: 'Creativity', description: 'Originality', weightage: 100 }],
            rules: ['Rule 1', 'Rule 2'],
            eligibility: ['Open to all'],
            rewards: [{ position: 1, label: '1st Winner', amount: 5000 }],
            aboutCompetition: 'Showcase your band.',
          }
        ];

        await Competition.insertMany(competitions);

        await User.create({
          name: 'Demo User',
          email: 'demo@feedants.com',
          password: 'Demo@123',
          profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
          phone: '+91 9876543210',
          referralCode: 'referral123',
          referralEarnings: 50,
        });

        res.send('<h1>Seed Success! 2 Dummy Competitions and 1 Demo User injected directly into MongoDB! Refresh your frontend.</h1>');
      } catch (err: any) {
        res.status(500).send(`<h1>Seed Failed: ${err.message}</h1>`);
      }
    });

    // Start Express server
    server = app.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully');
  if (server) {
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });
    
    // Force close server after 5 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 5000);
  } else {
    process.exit(0);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err.message);
  gracefulShutdown();
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err.message);
  gracefulShutdown();
});

// Handle nodemon / ts-node-dev restarts
process.once('SIGUSR2', () => {
  if (server) {
    server.close(() => {
      process.kill(process.pid, 'SIGUSR2');
    });
  }
});

// Handle graceful termination (Ctrl+C / Docker stop)
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

startServer();
