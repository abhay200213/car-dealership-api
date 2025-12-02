import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';
import { authenticate } from '../../../middleware/auth';
import { authorize } from '../../../middleware/authorize';
import { validateAppointment } from '../../../validation/appointmentValidation';

const router = Router();

// GET all appointments — GET /api/v1/appointments
router.get(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  appointmentController.getAllAppointments
);

// GET one appointment — GET /api/v1/appointments/:id
router.get(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  appointmentController.getAppointmentById
);

// CREATE appointment — POST /api/v1/appointments
router.post(
  '/',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  validateAppointment,
  appointmentController.createAppointment
);

// UPDATE appointment — PUT /api/v1/appointments/:id
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  validateAppointment,
  appointmentController.updateAppointment
);

// DELETE appointment — DELETE /api/v1/appointments/:id
router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  appointmentController.deleteAppointment
);

export default router;
