import { Request, Response, NextFunction } from 'express';
import * as vehicleService from '../services/vehicleService';

export const getAllVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

export const getVehicleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid vehicle ID' });
    }

    const vehicle = await vehicleService.getVehicleById(id);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: plug in Joi validation later
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid vehicle ID' });
    }

    const updated = await vehicleService.updateVehicle(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid vehicle ID' });
    }

    const deleted = await vehicleService.deleteVehicle(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
