import mongoose from 'mongoose';
import config from './index.js';

export async function connectDatabase() {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
  console.log(`[db] connected to MongoDB (${config.env})`);
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('[db] disconnected');
}
