import { Request, Response, NextFunction } from 'express';
import * as appointmentService from '../services/appointmentService';

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid appointment ID' });
    }

    const appointment = await appointmentService.getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid appointment ID' });
    }

    const updated = await appointmentService.updateAppointment(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid appointment ID' });
    }

    const deleted = await appointmentService.deleteAppointment(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
