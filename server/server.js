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
const __dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Static file configuration for client-side (Vite)
app.use(express.static(path.join(__dirname, '/client/dist')));

// Fallback route for Vite SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Test route to check Prisma connection
app.get('/', async (req, res) => {
  try {
    await prisma.$connect();
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
