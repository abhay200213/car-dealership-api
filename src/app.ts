import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import vehicleRoutes from './api/v1/routes/vehicleRoutes';
import customerRoutes from './api/v1/routes/customerRoutes';
import appointmentRoutes from './api/v1/routes/appointmentRoutes';
import saleRoutes from './api/v1/routes/saleRoutes';
import adminRoutes from './api/v1/routes/adminRoutes';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API v1 route mounts (empty for now)
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
