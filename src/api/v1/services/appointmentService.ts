import { db } from '../../../config/firebase';
import { Appointment } from '../models/appointment';

const collection = db.collection('appointments');

export const getAllAppointments = async (): Promise<Appointment[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => doc.data() as Appointment);
};

export const getAppointmentById = async (
  id: number
): Promise<Appointment | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Appointment;
};

export const createAppointment = async (
  data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Appointment> => {
  const snapshot = await collection.get();

  const ids = snapshot.docs
    .map((doc) => parseInt(doc.id, 10))
    .filter((n) => !Number.isNaN(n));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  const now = new Date().toISOString();

  const appointment: Appointment = {
    id: newId,
    status: 'scheduled',
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await collection.doc(newId.toString()).set(appointment);

  return appointment;
};

export const updateAppointment = async (
  id: number,
  data: Partial<Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Appointment | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const existing = doc.data() as Appointment;
  const updated: Appointment = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  await docRef.set(updated);
  return updated;
};

export const deleteAppointment = async (id: number): Promise<boolean> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};
