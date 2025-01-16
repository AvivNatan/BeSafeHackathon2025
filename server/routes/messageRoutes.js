import express from 'express';
import {
    sendMessage,
    getMessageHistory,
    getMessagesByDateRange,
    deleteMessage
} from '../controllers/messageController.js';
const router = express.Router();
// Get all chat history with pagination
// GET /api/chat/history/123?page=1&limit=50
router.get('/history/:userId', getMessageHistory);
// Get messages within specific date range
// POST /api/chat/history/range/123
router.post('/history/range/:userId', getMessagesByDateRange);
// Send new message
// POST /api/chat/send
router.post('/send', sendMessage);
// Delete message and its response
// DELETE /api/chat/message/123
router.delete('/message/:messageId', deleteMessage);
export default router;