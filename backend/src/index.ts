import express from 'express';
import authRoutes from '@routes/auth.route';
import messageRoutes from '@routes/message.route';
import cookieParser from 'cookie-parser';
import logger from '@managers/logger.manager';
import { app, server } from '@services/socket/socket';
import dotenv from 'dotenv';

import path from 'path';

dotenv.config();

const PORT = process.env['PORT'] || 5001;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env['NODE_ENV'] === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (_req,res) =>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

server.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
  });
