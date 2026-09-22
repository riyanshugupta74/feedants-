import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter';
import { env } from './config/env';

const app = express();

// ─── Security Middleware ───────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ─── Rate Limiting ─────────────────────────────────────────────
app.use(generalLimiter);

// ─── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ───────────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── API Routes ────────────────────────────────────────────────
app.use('/api', routes);

// ─── Root Route ────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Feedants Competition API',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// ─── Error Handling ────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
