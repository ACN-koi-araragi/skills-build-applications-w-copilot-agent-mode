import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'moderate', 'hard'], default: 'moderate' },
    focusArea: { type: String, default: '' },
    equipment: [{ type: String }],
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'workouts' });
export const Workout = mongoose.model('Workout', WorkoutSchema, 'workouts');
