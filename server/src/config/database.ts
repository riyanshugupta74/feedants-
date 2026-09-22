import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

// Configure Node DNS to use Google and Cloudflare DNS to resolve MongoDB Atlas SRV records
// Workaround for Node.js v24 DNS resolution issue on Windows
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
  });
};
