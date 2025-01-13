import Message from '../models/Message.js';
import User from '../models/User.js';
import { analyzeMessage } from '../services/messageAnalyzer.js'; //or whereever and whatever the name will be

// Function to send a new message and get response
const sendMessage = async (req, res) => {
    const { userId, message } = req.body;
    
    try {
        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Create new chat message from user
        const newUserMessage = new Message({
            userId,
            message,
            timestamp: new Date(),
            isUserMessage: true // Flag to identify user messages
        });

        // Save user message
        await newUserMessage.save();

        // orel's analysis service will be integrated here
        // For now, used placeholder that simulates the response
        
        // Placeholder for analysis result
        const analysisResult = await analyzeMessage(message);  // orel     
        
        // Create and save website's response
        const websiteResponse = new Message({
            userId,
            message: analysisResult.responseText, // Replace with actual response
            timestamp: new Date(),
            isUserMessage: false, // Flag to identify website responses
            inResponseTo: newUserMessage._id // Reference to original message
        });

        await websiteResponse.save();

        res.status(201).json({
            userMessage: newUserMessage,
            websiteResponse: websiteResponse
        });

    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Function to get complete chat history with responses
const getMessageHistory = async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate, limit = 50, page = 1 } = req.query;
    
    try {
        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // query conditions
        const queryConditions = { userId };
        if (startDate || endDate) {
            queryConditions.timestamp = {};
            if (startDate) {
                queryConditions.timestamp.$gte = new Date(startDate);
            }
            if (endDate) {
                queryConditions.timestamp.$lte = new Date(endDate);
            }
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Get chat history with pagination
        const MessageHistory = await Message.find(queryConditions)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('inResponseTo', 'message timestamp')
            .lean(); 

        // Get total count for pagination
        const totalMessages = await Message.countDocuments(queryConditions);

        // Group messages by date
        const groupedHistory = MessageHistory.reduce((acc, message) => {
            const date = message.timestamp.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(message);
            return acc;
        }, {});

        res.status(200).json({
            MessageHistory: groupedHistory,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalMessages / limit),
                totalMessages,
                messagesPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Function to get messages from a specific date range -  nice to have but do we have a front that supports this? 
const getMessagesByDateRange = async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.body;

    try {
        const messages = await Message.find({
            userId,
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        .sort({ timestamp: 1 })
        .populate('inResponseTo', 'message timestamp');

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching messages by date range:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Function to delete a message and its response
const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    const { userId } = req.body;

    try {
        // Find and verify message belongs to user
        const message = await Message.findOne({ _id: messageId, userId });
        if (!message) {
            return res.status(404).json({ 
                message: 'Message not found or unauthorized.' 
            });
        }

        // Delete the message and its response
        await Message.deleteMany({
            $or: [
                { _id: messageId },
                { inResponseTo: messageId }
            ]
        });
        
        res.status(200).json({ message: 'Message and its response deleted successfully.' });

    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export {
    sendMessage,
    getMessageHistory,
    getMessagesByDateRange,
    deleteMessage
};