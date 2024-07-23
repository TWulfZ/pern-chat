import express from 'express';
import CookieParser from 'cookie-parser';

import authRoutes from '@routes/auth.route.ts';
import messageRoutes from '@routes/message.route.ts';
import cookieParser from 'cookie-parser';
import logger from '@managers/logger.manager.ts';

const app = express();
const PORT = process.env.PORT || 5001;
const SERVER_URL = process.env.SERVER_URL;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  const envMessage = 
    process.env.NODE_ENV !== 'development'
    ? `Server listening at ${SERVER_URL}`
    : `Server listening at http://localhost:${PORT}`;

  logger.info(envMessage);
  });

// TODO: Add socket.io to the server
// TODO: Configure this server for the deployment
