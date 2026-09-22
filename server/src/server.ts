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
    app.get('/api/seed', (req, res) => {
      exec('npx ts-node src/seeds/seed.ts', (error, stdout, stderr) => {
        if (error) {
          res.status(500).send(`<pre>Seed Error: ${error.message}\n${stderr}</pre>`);
          return;
        }
        res.send(`<pre>Seed Success!\n${stdout}</pre>`);
      });
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
