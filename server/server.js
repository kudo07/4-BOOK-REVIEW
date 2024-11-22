import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import ws from 'ws';

dotenv.config();

// Set up WebSocket constructor for Neon
neonConfig.webSocketConstructor = ws;

// Database connection string
const connectionString = process.env.DATABASE_URL;

// Set up the pool with Neon and PrismaNeon adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// Initialize Prisma Client with the Neon adapter
const prisma = new PrismaClient({ adapter });

// Express app setup
const app = express();
const _dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
  origin: 'https://boorew.onrender.com/',
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, '../client/dist')));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Test route to check Prisma connection
await prisma.$connect();
app.get('/', async (req, res) => {
  try {
    res.send('Server and database are running!');
  } catch (error) {
    res.send('Failed to connect to the database');
    console.error(error);
  }
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'));
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverr is running on port ${PORT}`);
});
