import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { prisma } from './config/connection.js';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
dotenv.config();
const __dirname = path.resolve();
// dynamic directory name
// define the static folder for the build in production
// create our static path
const app = express();
app.use(express.static(path.join(__dirname, '/client/dist')));
// find this directory and send it to this file
// in vite dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// any place or any thing inside the client side
// connection string
const PORT = process.env.PORT || 3000;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', async (req, res) => {
  try {
    await prisma.$connect();
    res.send('server and databse are runing!');
  } catch (error) {
    res.send('failed to connect to the database');
    console.log(error);
  }
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
// server

app.listen(3000, () => {
  console.log(`server is running in ${PORT}`);
});
