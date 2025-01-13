import { connections } from '../config/db.js';
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({ //
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isUserMessage: {type: Boolean,required: true,default: true }, // True for user messages, False for website responses - Distinguishes between user messages and website responses
    inResponseTo: // Links responses to original messages
    {type: mongoose.Schema.Types.ObjectId, // MongoDB's ID type
        ref: 'Message', // References this same message model
        default: null} // null for user messages, filled for responses
});

messageSchema.index({ userId: 1, timestamp: -1 });


const Message = connections.loginUserDB?.model('Message', messageSchema);

export default Message;

//complete - define the collection for a message 
//each user has multiple messages in his history 
//we need to show message history 

