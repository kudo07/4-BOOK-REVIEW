import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { prisma } from './config/connection.js';

dotenv.config();
// connection string
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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

// example

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
