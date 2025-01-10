import { connections } from '../config/db.js';

// יצירת סכמת המשתמש
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// יצירת המודל באמצעות חיבור ספציפי
const User = connections.loginUserDB?.model('User', userSchema);

export default User;


