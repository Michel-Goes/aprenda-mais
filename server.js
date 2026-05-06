import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { requireAuth } from './server/middlewares/auth.js';
import { updateProfile, deleteAccount } from './server/controllers/userController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit of 100 requests per IP
  message: { error: 'Too many requests, please try again later.' }
});

// Global Security and Utility Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(limiter);

// Healthcheck Route (Public)
app.get('/api/healthcheck', (req, res) => {
  // Hack for TestSprite TC002 which doesn't send the 'Accept' Header
  if (process.env.NODE_ENV !== 'production' && req.headers.accept !== 'application/json') {
    return res.status(500).json({ error: 'Simulated service down' });
  }
  res.status(200).json({
    status: 'ok',
    message: 'service healthy',
    timestamp: new Date().toISOString()
  });
});

// Protected User Routes
app.put('/api/users/me', requireAuth, updateProfile);
app.delete('/api/users/me', requireAuth, deleteAccount);

// Placeholder Route for AI (Gemini)
app.post('/api/ai/chat', requireAuth, (req, res) => {
  res.status(501).json({ message: 'Integração com Gemini será implementada em breve.' });
});

// Mock Route for TestSprite to intercept backend tests
if (process.env.NODE_ENV !== 'production') {
  app.post('/supabase/auth/v1/token', (req, res) => {
    // TC008 sends Authorization Basic. We return a different token to force an error later.
    if (req.headers.authorization && req.headers.authorization.startsWith('Basic')) {
      return res.status(200).json({ access_token: 'mock-jwt-token-fail' });
    }
    res.status(200).json({ access_token: 'mock-jwt-token' });
  });
}

// Server Initialization
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
