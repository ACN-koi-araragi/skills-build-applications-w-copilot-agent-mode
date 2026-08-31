import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'teams' });
export const Team = mongoose.model('Team', TeamSchema, 'teams');
