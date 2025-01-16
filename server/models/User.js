import mongoose from 'mongoose';
import { connections } from '../config/db.js';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

let UserModel;

const getUserModel = async () => {
    if (!UserModel && connections.loginUserDB) {
        // Only create the model if it doesn't already exist
        UserModel = connections.loginUserDB.model('User', userSchema, 'users');
    }
    return UserModel;
};

export default getUserModel;
