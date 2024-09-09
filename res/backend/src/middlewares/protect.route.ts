import jwt, { type JwtPayload } from 'jsonwebtoken';

import type { Request, Response, NextFunction } from 'express';
import prisma from '@db/prisma';

interface DecodedToken extends JwtPayload {
  userId: string;
}

// @Override the Request Express interface
declare global {
  namespace Express {
    export interface Request {
      user: { id: string };
    }
  }
}

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['jwt'];

    if (!token) {
      return res.status(401).json({ error: 'Sin autorización - No hay token' });
    }

    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({ error: 'Sin autorización - Token no válido' });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullName: true, profilePic: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error en el middleware 'protectRoute': ", error.message);
  }
};

export default protectRoute;
