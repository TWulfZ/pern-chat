import prisma from '@db/prisma.ts';
import type { Request, Response } from 'express';

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        paricipantsId: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation);
  } catch (error: any) {
    // TODO: Add Winston logs
    console.log('Error in signup controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        paricipantsId: {
          hasEvery: [senderId, reciverId],
        },
      },
    });

    // Cuando el primer mensaje es enviado, creamos una nueva conversacion entre el senderId y el reciverId
    if (!conversation) {
      // si la conversacion no existe
      conversation = await prisma.conversation.create({
        data: {
          paricipantsId: [senderId, reciverId],
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

    res.status(201).json(newMessage);
  } catch (error: any) {
    // TODO: Add Winston logs
    console.log('Error in signup controller: ', error.message);
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
    // TODO: Add Winston logs
    console.log('Error in signup controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};
