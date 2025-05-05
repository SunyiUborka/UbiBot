import mongoose from 'mongoose'
import logger from './logger.js'
import * as dotenv from 'dotenv'
dotenv.config()

let uri = `mongodb://${process.env.MONGODB_ROOT_USER}:${process.env.MONGODB_ROOT_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
let retryAttempts = 0;
const maxRetries = 5;

export async function connectDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      tls: false,
      authSource: "admin"
    });

    logger.info('✅ Mongoose connected');
    retryAttempts = 0;

    mongoose.connection.on('disconnected', handleDisconnect);
    mongoose.connection.on('error', handleDisconnect);

  } catch (error) {
    logger.error(`❌ Initial mongoose connection error: ${error.message}`);
    retryReconnect();
  }
}

function handleDisconnect(err) {
  logger.warn('⚠️ Mongoose disconnected or error:', err?.message || err);
  retryReconnect();
}

function retryReconnect() {
  retryAttempts++;
  if (retryAttempts > maxRetries) {
    logger.error('❌ Max retry attempts reached. Giving up.');
    return;
  }

  const retryDelay = Math.min(1000 * 2 ** retryAttempts, 30000);
  logger.info(`🔄 Retrying mongoose connect in ${retryDelay / 1000}s (attempt ${retryAttempts}/${maxRetries})`);
  setTimeout(connectDB, retryDelay);
}