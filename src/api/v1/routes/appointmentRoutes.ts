import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController.ts';
import { validateAppointment } from '../../../validation/appointmentValidation';

const router = Router();

// GET /api/v1/appointments
router.get('/appointments', appointmentController.getAllAppointments);

// GET /api/v1/appointments/:id
router.get('/appointments/:id', appointmentController.getAppointmentById);

// POST /api/v1/appointments
router.post(
  '/appointments',
  validateAppointment,
  appointmentController.createAppointment
);

// PUT /api/v1/appointments/:id
router.put(
  '/appointments/:id',
  validateAppointment,
  appointmentController.updateAppointment
);

// DELETE /api/v1/appointments/:id
router.delete('/appointments/:id', appointmentController.deleteAppointment);

export default router;
