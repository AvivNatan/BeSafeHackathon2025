import User from '../models/User.js'; // מייבא את המודל
//import connectToLoginUserDB from '../config/db.js'; // מייבא את החיבור


// פונקציה להוספת משתמש חדש
const registerUser = async (req, res) => {
    const { fullName, email, username, password } = req.body;

    try {
        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // יצירת משתמש חדש
        const newUser = new User({ fullName, email, username, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// פונקציה לבדוק התחברות משתמש קיים
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקה אם המשתמש קיים ב-DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // בדיקה אם הסיסמה נכונה
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


export {
    registerUser,
    loginUser
};