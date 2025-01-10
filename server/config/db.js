import mongoose from 'mongoose';

const connections = {};

// חיבור למסד הנתונים הראשון
const connectToLoginUserDB = async () => {
    try {
        const loginUserDB = await mongoose.createConnection(process.env.MONGO_LOGIN_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connections.loginUserDB = loginUserDB;
        console.log('Connected to loginUserDB');
    } catch (error) {
        console.error('Error connecting to loginUserDB:', error);
    }
};

// חיבור למסד נתונים נוסף...

// פונקציה להתחברות לכל מסדי הנתונים
const connectToAllDBs = async () => {
    //await Promise.all([connectToLoginUserDB(), connectToAnotherDB()]);
    await Promise.all([connectToLoginUserDB()]);
};

export { connections, connectToAllDBs };
