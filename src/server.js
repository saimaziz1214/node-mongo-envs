import config from './config/index.js';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function start() {
  try {
    await connectDatabase();
    const server = app.listen(config.port, () => {
      console.log(`[server] ${config.env} running on http://localhost:${config.port}`);
    });

    const shutdown = async (signal) => {
      console.log(`[server] ${signal} received, shutting down`);
      server.close();
      await disconnectDatabase();
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error(`[server] failed to start: ${err.message}`);
    process.exit(1);
  }
}

start();
