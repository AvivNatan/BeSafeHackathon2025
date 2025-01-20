import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectToAllDBs } from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // מייבא את ה-routes
import messageRoutes from './routes/messageRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());

// התחברות לכל מסדי הנתונים
connectToAllDBs();

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: process.env.CLIENT_URL
}));


// חיבור ל-routes של משתמשים
app.use('/user', userRoutes);
app.use('/api/messages', messageRoutes);  // added my message routes







