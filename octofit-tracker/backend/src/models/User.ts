import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['student', 'coach', 'team-admin'],
      default: 'student',
    },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'users' },
);

export const User = mongoose.model('User', UserSchema, 'users');
