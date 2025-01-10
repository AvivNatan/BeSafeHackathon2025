import express from 'express';
import {
    registerUser,
    loginUser,
} from '../controllers/userController.js'; // מייבא את פונקציות הבקר

const router = express.Router();

// אנדפוינט להוספת משתמש חדש
router.post('/register', registerUser);

// אנדפוינט להתחברות משתמש קיים
router.post('/login', loginUser);

export default router;
