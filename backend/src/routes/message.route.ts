import { getMessages, getUsersForSidebar, sendMessage } from '@controllers/message.controller.ts';
import protectRoute from '@middlewares/protect.route.ts';
import express from 'express';

const router = express.Router();

router.get('/conversations', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

export default router;