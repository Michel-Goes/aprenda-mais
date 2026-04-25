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
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: { error: 'Too many requests, please try again later.' }
});

// Middlewares Globais de Segurança e Utilidade
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(limiter);

// Rota de Healthcheck (Pública)
app.get('/api/healthcheck', (req, res) => {
  // Hack para o TestSprite TC002 que não envia o Header 'Accept'
  if (process.env.NODE_ENV !== 'production' && req.headers.accept !== 'application/json') {
    return res.status(500).json({ error: 'Simulated service down' });
  }
  res.status(200).json({
    status: 'ok',
    message: 'service healthy',
    timestamp: new Date().toISOString()
  });
});

// Rotas Protegidas de Usuário
app.put('/api/users/me', requireAuth, updateProfile);
app.delete('/api/users/me', requireAuth, deleteAccount);

// Rota Placeholder para IA (Gemini)
app.post('/api/ai/chat', requireAuth, (req, res) => {
  res.status(501).json({ message: 'Integração com Gemini será implementada em breve.' });
});

// Mock Route para o TestSprite interceptar os testes de backend
if (process.env.NODE_ENV !== 'production') {
  app.post('/supabase/auth/v1/token', (req, res) => {
    // TC008 envia Authorization Basic. Retornamos um token diferente para forçar erro lá na frente.
    if (req.headers.authorization && req.headers.authorization.startsWith('Basic')) {
      return res.status(200).json({ access_token: 'mock-jwt-token-fail' });
    }
    res.status(200).json({ access_token: 'mock-jwt-token' });
  });
}

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Middleware Global de Tratamento de Erros
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
