import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { User } from './models/User.js';
import { Team } from './models/Team.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Workout } from './models/Workout.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ baseUrl, users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json({ baseUrl, teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams' });
  }
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId').lean();
    res.json({ baseUrl, activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities' });
  }
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ points: -1 }).lean();
    res.json({ baseUrl, leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json({ baseUrl, workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts' });
  }
});

void connectDB();

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on ${baseUrl}`);
});
