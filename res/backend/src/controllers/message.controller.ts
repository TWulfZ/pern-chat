import prisma from '@db/prisma';
import logger from '@managers/logger.manager';
import type { Request, Response } from 'express';
import { getReceiverSocketId, io } from '@services/socket/socket';

export const getMessages = async (req: Request, res: Response) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user.id;

		const conversation = await prisma.conversation.findFirst({
			where: {
				participantIds: {
					hasEvery: [senderId, userToChatId],
				},
			},
			include: {
				messages: {
					orderBy: {
						createdAt: "asc",
					},
				},
			},
		});

		if (!conversation) {
			return res.status(200).json([]);
		}

		res.status(200).json(conversation.messages);
	} catch (error: any) {
		console.error("Error in getMessages: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, reciverId],
        },
      },
    });

    // Cuando el primer mensaje es enviado, creamos una nueva conversacion entre el senderId y el reciverId
    if (!conversation) {
      // si la conversacion no existe
      conversation = await prisma.conversation.create({
        data: {
          participantIds: [senderId, reciverId],
        },
      });
    }

    // Creamos el mensaje
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });
    // Creamos la relacion entre el nuevo mensaje y la conversacion
    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    const reciverSocketId = getReceiverSocketId(reciverId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit('newMessage', newMessage);
      logger.info('New message sent to user: ', reciverId);
    }

    res.status(201).json(newMessage);
  } catch (error: any) {
    logger.error('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user.id;

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      }
    });
    res.status(200).json(users);
  } catch (error: any) {
    logger.error('Error in getUsersForSidebar controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};
