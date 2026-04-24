import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requireAuth } from './server/middlewares/auth.js';
import { updateProfile, deleteAccount } from './server/controllers/userController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  credentials: true
}));
app.use(express.json());

// Rota de Healthcheck (Pública)
app.get('/api/healthcheck', (req, res) => {
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

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
