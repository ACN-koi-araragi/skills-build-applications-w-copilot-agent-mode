import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Ava Patel',
                email: 'ava.patel@mergington.edu',
                role: 'coach',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Leo Martinez',
                email: 'leo.martinez@mergington.edu',
                role: 'student',
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Maya Johnson',
                email: 'maya.johnson@mergington.edu',
                role: 'student',
                fitnessLevel: 'advanced',
            },
            {
                name: 'Noah Kim',
                email: 'noah.kim@mergington.edu',
                role: 'student',
                fitnessLevel: 'beginner',
            },
        ]);
        const [coach, leo, maya, noah] = users;
        const teams = await Team.insertMany([
            {
                name: 'Trail Blazers',
                description: 'Fast-paced cardio and endurance team',
                members: [leo._id, maya._id],
                totalPoints: 2100,
            },
            {
                name: 'Peak Performers',
                description: 'Strength and conditioning focused group',
                members: [coach._id, noah._id],
                totalPoints: 1850,
            },
        ]);
        await User.updateMany({ _id: { $in: [leo._id, maya._id, noah._id] } }, { $set: { teamId: teams[0]._id } });
        await User.updateOne({ _id: coach._id }, { $set: { teamId: teams[1]._id } });
        const activities = await Activity.insertMany([
            {
                userId: leo._id,
                type: 'run',
                durationMinutes: 35,
                date: new Date('2026-08-28T06:15:00.000Z'),
                caloriesBurned: 420,
                notes: 'Tempo run around the track',
            },
            {
                userId: maya._id,
                type: 'cycling',
                durationMinutes: 45,
                date: new Date('2026-08-29T17:00:00.000Z'),
                caloriesBurned: 510,
                notes: 'Stationary bike intervals',
            },
            {
                userId: noah._id,
                type: 'strength',
                durationMinutes: 40,
                date: new Date('2026-08-30T18:30:00.000Z'),
                caloriesBurned: 380,
                notes: 'Lower body strength session',
            },
            {
                userId: coach._id,
                type: 'walk',
                durationMinutes: 30,
                date: new Date('2026-08-31T07:00:00.000Z'),
                caloriesBurned: 180,
                notes: 'Recovery walk',
            },
        ]);
        await Leaderboard.insertMany([
            {
                userId: maya._id,
                name: 'Maya Johnson',
                points: 1280,
                rank: 1,
                streak: 8,
            },
            {
                userId: leo._id,
                name: 'Leo Martinez',
                points: 1150,
                rank: 2,
                streak: 6,
            },
            {
                userId: noah._id,
                name: 'Noah Kim',
                points: 980,
                rank: 3,
                streak: 4,
            },
            {
                userId: coach._id,
                name: 'Ava Patel',
                points: 900,
                rank: 4,
                streak: 3,
            },
        ]);
        await Workout.insertMany([
            {
                name: 'Morning Sprint Ladder',
                type: 'cardio',
                durationMinutes: 25,
                difficulty: 'hard',
                focusArea: 'speed',
                equipment: ['track', 'cones'],
                description: 'Progressive sprint intervals with recovery walks.',
            },
            {
                name: 'Strength Circuit',
                type: 'strength',
                durationMinutes: 40,
                difficulty: 'moderate',
                focusArea: 'full-body',
                equipment: ['dumbbells', 'bench'],
                description: 'Compound lifts and bodyweight movements.',
            },
            {
                name: 'Mobility Reset',
                type: 'recovery',
                durationMinutes: 20,
                difficulty: 'easy',
                focusArea: 'mobility',
                equipment: ['mat'],
                description: 'Stretching and mobility flow to recover from activity.',
            },
        ]);
        console.log('Created users:', users.length);
        console.log('Created teams:', teams.length);
        console.log('Created activities:', activities.length);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
void seedDatabase();
