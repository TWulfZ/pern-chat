import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import logger from '@managers/logger.manager.ts';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [`http://localhost:5173`],
    methods: ['GET', 'POST'],
  },
});

const getReciverSocketId = (reciverId: string) => {
  return userSocketMap[reciverId];
}

const userSocketMap: {[key: string]: string} = {}; 

io.on('connection', (socket) => {
  //logger.info('👤 a user connected', socket.id);

  const userId = socket.handshake.query.userId as string;

  if(userId) userSocketMap[userId] = socket.id;
  
  // io.emit() sirve para enviar eventos a todos los usuarios conectados 
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() sirve para escuchar eventos. Puede ser usado en ambos lados (cliente y servidor)
  socket.on('disconnect', () => {
    //logger.info('🔌 user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})

export { app, io, server, getReciverSocketId }