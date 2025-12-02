import { db } from '../../../config/firebase';
import { Vehicle } from '../models/vehicle';

export interface VehicleQueryOptions {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'year';
  sortOrder?: 'asc' | 'desc';
}

const collection = db.collection('vehicles');

/**
 * Get all vehicles.
 */
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => doc.data() as Vehicle);
};

/**
 * Get a single vehicle by numeric ID.
 */
export const getVehicleById = async (id: number): Promise<Vehicle | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Vehicle;
};

/**
 * Create a new vehicle with an auto-incrementing numeric ID.
 */
export const createVehicle = async (
  data: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Vehicle> => {
  const snapshot = await collection.get();

  const ids = snapshot.docs
    .map((doc) => parseInt(doc.id, 10))
    .filter((n) => !Number.isNaN(n));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  const now = new Date().toISOString();

  const vehicle: Vehicle = {
    id: newId,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await collection.doc(newId.toString()).set(vehicle);

  return vehicle;
};

/**
 * Update an existing vehicle.
 */
export const updateVehicle = async (
  id: number,
  data: Partial<Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Vehicle | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const existing = doc.data() as Vehicle;
  const updated: Vehicle = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  await docRef.set(updated);
  return updated;
};

/**
 * Delete a vehicle by ID.
 */
export const deleteVehicle = async (id: number): Promise<boolean> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};

/**
 * Search vehicles with optional filters and sorting.
 */
export const searchVehicles = async (
  options: VehicleQueryOptions
): Promise<Vehicle[]> => {
  const snapshot = await collection.get();
  let vehicles = snapshot.docs.map((doc) => doc.data() as Vehicle);

  const {
    make,
    model,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = options;

  if (make) {
    vehicles = vehicles.filter(
      (v) => v.make?.toLowerCase() === make.toLowerCase()
    );
  }

  if (model) {
    vehicles = vehicles.filter(
      (v) => v.model?.toLowerCase() === model.toLowerCase()
    );
  }

  if (typeof minYear === 'number') {
    vehicles = vehicles.filter(
      (v) => typeof v.year === 'number' && v.year >= minYear
    );
  }

  if (typeof maxYear === 'number') {
    vehicles = vehicles.filter(
      (v) => typeof v.year === 'number' && v.year <= maxYear
    );
  }

  if (typeof minPrice === 'number') {
    vehicles = vehicles.filter(
      (v) => typeof v.price === 'number' && v.price >= minPrice
    );
  }

  if (typeof maxPrice === 'number') {
    vehicles = vehicles.filter(
      (v) => typeof v.price === 'number' && v.price <= maxPrice
    );
  }

  if (sortBy) {
    const dir = sortOrder === 'desc' ? -1 : 1;

    vehicles = vehicles.sort((a, b) => {
      const av = ((a as any)[sortBy] ?? 0) as number;
      const bv = ((b as any)[sortBy] ?? 0) as number;

      if (av > bv) return 1 * dir;
      if (av < bv) return -1 * dir;
      return 0;
    });
  }

  return vehicles;
};
