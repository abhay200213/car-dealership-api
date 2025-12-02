import { db } from '../../../config/firebase';
import { Vehicle } from '../models/vehicle';

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
