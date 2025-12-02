import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import rateLimit from 'express-rate-limit';

import vehicleRoutes from './api/v1/routes/vehicleRoutes';
import customerRoutes from './api/v1/routes/customerRoutes';
import appointmentRoutes from './api/v1/routes/appointmentRoutes';
import saleRoutes from './api/v1/routes/saleRoutes';
import adminRoutes from './api/v1/routes/adminRoutes';

dotenv.config();

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiter for all v1 routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 3,                  // limit each IP to 3 requests per window
  standardHeaders: true,
  legacyHeaders: false     
});
app.use('/api/v1', apiLimiter);

// Load Swagger JSON
const swaggerPath = path.join(__dirname, '..', 'swagger.json');
let swaggerDoc: any = null;

try {
  const swaggerRaw = fs.readFileSync(swaggerPath, 'utf-8');
  swaggerDoc = JSON.parse(swaggerRaw);
} catch (err) {
  console.warn('Swagger spec not found or invalid. /api-docs will not be available.');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Swagger UI
if (swaggerDoc) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

// API v1 route mounts
app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v1', appointmentRoutes);
app.use('/api/v1', saleRoutes);
app.use('/api/v1', adminRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Car Dealership API listening on port ${PORT}`);
  });
}

export default app;
