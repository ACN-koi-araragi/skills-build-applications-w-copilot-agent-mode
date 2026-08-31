import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    date: { type: Date, required: true },
    caloriesBurned: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'activities' });
export const Activity = mongoose.model('Activity', ActivitySchema, 'activities');
