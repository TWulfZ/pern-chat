import express from 'express';

const router = express.Router();

router.post('/conversations', (req, res) => {
  res.send('Conversation route')
});

export default router;