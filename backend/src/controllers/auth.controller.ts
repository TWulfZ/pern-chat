import type { Request, Response } from 'express';
import prisma from '@db/prisma.ts';
import bycriptjs from 'bcryptjs';
import generateToken from '@utils/generateToken.ts';
import logger from '@managers/logger.manager.ts';

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'Por favor, llene todos los campos' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const salt = await bycriptjs.genSalt(10);
    const hashedPassword = await bycriptjs.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        username: username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      // generate token in a sec
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error: any) {
    logger.error('Error in signup controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }

    const isPasswordCorrect = await bycriptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    generateToken(user.id, res);
    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });

  } catch (error: any) {
    logger.error('Error in login controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Sesión cerrada' });
  } catch (error: any) {
    logger.error('Error in logout controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id}})

    if(!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })

  } catch (error: any) {
    logger.error('Error in getMe controller: ', error.message);
    res.status(500).json({ error: 'Error interno con el servidor' });
  }
};
