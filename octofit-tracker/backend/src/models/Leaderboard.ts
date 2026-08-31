import mongoose, { Schema } from 'mongoose';

const LeaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'leaderboard' },
);

export const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema, 'leaderboard');
