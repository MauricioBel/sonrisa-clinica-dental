import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody } from '../middleware/validate.js';
import { chatRequestSchema } from '../schemas/chat.js';
import { processChatMessage } from '../services/chat.service.js';

export const chatRouter = Router();

chatRouter.post(
  '/',
  validateBody(chatRequestSchema),
  asyncHandler(async (req, res) => {
    const { message, history = [] } = req.body;
    const result = await processChatMessage(message, history);
    res.json({ data: result });
  })
);