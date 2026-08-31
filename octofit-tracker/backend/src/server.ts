import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl });
});

app.get('/api/users', (req, res) => {
  res.json({
    baseUrl,
    users: [
      { id: 1, name: 'Ava', role: 'coach' },
      { id: 2, name: 'Leo', role: 'athlete' },
      { id: 3, name: 'Maya', role: 'team-admin' },
    ],
  });
});

app.get('/api/activities', (req, res) => {
  res.json({
    baseUrl,
    activities: [
      { id: 1, userId: 1, type: 'run', duration: 30, date: '2026-08-31' },
      { id: 2, userId: 2, type: 'cycling', duration: 45, date: '2026-08-31' },
      { id: 3, userId: 3, type: 'strength', duration: 40, date: '2026-08-31' },
    ],
  });
});

connectDB();

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on ${baseUrl}`);
});
