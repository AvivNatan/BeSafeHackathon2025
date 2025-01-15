//import User from '../models/User.js'; // מייבא את המודל
//import { connections } from '../config/db.js';
import getUserModel from '../models/User.js';


const registerUser = async (req, res) => {
    try {
        const User = await getUserModel();
        if (!User) {
            return res.status(500).json({ message: 'Database connection error' });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


// // פונקציה להוספת משתמש חדש
// const registerUser = async (req, res) => {
//     const { fullName, email, username, password } = req.body;

//     try {
//         // בדיקה אם המשתמש כבר קיים
//         if (connections.loginUserDB) {
//             console.log(connections.loginUserDB.readyState);
//         }
//         else {
//             console.log("doesnt exsist");

//         }
//         const getUser = await User();
//         const existingUser = await getUser.find({ email: email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists.' });
//         }

//         // יצירת משתמש חדש
//         const newUser = new User({ fullName, email, username, password });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully!', user: newUser });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };

// פונקציה לבדוק התחברות משתמש קיים
const loginUser = async (req, res) => {
    //const { email, password } = req.body;

    try {
        const User = await getUserModel();
        if (!User) {
            return res.status(500).json({ message: 'Database connection error' });
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            if (existingUser.password !== req.body.password) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
            res.status(200).json({ message: 'Login successful!', user: existingUser.fullName });
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


export {
    registerUser,
    loginUser
};