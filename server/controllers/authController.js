import { prisma } from '../config/connection.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(errorHandler(404, 'User Not found'));
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid User'));
    }
    // exclide the passwrod
    const { password: hashedPassword, ...rest } = user;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000); //one hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// SIGNOUT

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success');
};
