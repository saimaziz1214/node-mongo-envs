import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SUPPORTED_ENVS = ['staging', 'preprod', 'prod'];
const env = process.env.NODE_ENV || 'staging';

if (!SUPPORTED_ENVS.includes(env)) {
  throw new Error(`Unsupported NODE_ENV "${env}". Use one of: ${SUPPORTED_ENVS.join(', ')}`);
}

const envFile = path.resolve(process.cwd(), `.env.${env}`);
if (!existsSync(envFile)) {
  throw new Error(`Missing .env.${env} (copy .env.${env}.example and fill it in)`);
}

dotenv.config({ path: envFile, quiet: true });

const REQUIRED_VARS = ['PORT', 'MONGO_URI'];
const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing variables in .env.${env}: ${missing.join(', ')}`);
}

const config = Object.freeze({
  env,
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
});

export default config;
