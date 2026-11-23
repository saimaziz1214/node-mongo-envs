import express from 'express';
import config from './config/index.js';
import productRoutes from './routes/product.routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', env: config.env }));
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
