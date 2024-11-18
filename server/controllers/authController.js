import { prisma } from '../config/connection.js';

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
