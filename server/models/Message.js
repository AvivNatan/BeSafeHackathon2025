import { connections } from '../config/db.js';
import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({ //
    userId: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
    isUserMessage: { type: Boolean, required: true, default: true }, // True for user messages, False for website responses - Distinguishes between user messages and website responses
    inResponseTo: // Links responses to original messages
    {
        type: mongoose.Schema.Types.ObjectId, // MongoDB's ID type
        ref: 'Message', // References this same message model
        default: null
    }, // null for user messages, filled for responses
     // Add this new field for analysis results
     //analysisResult: {
        isSuspicious: { type: Boolean, default: null }
        // You can add more analysis fields here if needed
    //}
});

messageSchema.index({ userId: 1, timestamp: -1 });
//const Message = connections.loginUserDB?.model('Message', messageSchema);

let MessageModel;

const getMessageModel = async () => {
    if (!MessageModel && connections.loginUserDB) {
        // Only create the model if it doesn't already exist
        MessageModel = connections.loginUserDB.model('Message', messageSchema, 'messages');
    }
    return MessageModel;
};

export default getMessageModel;

