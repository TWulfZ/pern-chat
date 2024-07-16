import express from 'express';
import CookieParser from 'cookie-parser';

import authRoutes from '@routes/auth.route.ts';
import messageRoutes from '@routes/message.route.ts';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT!;

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
  console.log('Listening on port ' + port + ', try it out: http://localhost:' + port);
});

// TODO: Add socket.io to the server
// TODO: Configure this server for the deployment
