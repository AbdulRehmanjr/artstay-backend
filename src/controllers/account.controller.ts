import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '~/libs/prisma';
import { env } from '~/env';
import { logger } from '~/utils/logger';

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password, accountType }: AccountProps = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
        accountType
      }
    });
    res.status(201).json({status: 'authorized'});
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create account'
    });
  }
};

export const loginAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.account.findUnique({ where: { email } });
    if (!user) throw new Error("Email not associted with any account")

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Password not matched")

    const token = jwt.sign({ userId: user.userId }, env.JWT_SECRET);

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ status: 'success', data: {} });
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create account'
    });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};