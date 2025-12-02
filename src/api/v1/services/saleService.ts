import { db } from '../../../config/firebase';
import { Sale } from '../models/sale';

const collection = db.collection('sales');

export const getAllSales = async (): Promise<Sale[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => doc.data() as Sale);
};

export const getSaleById = async (id: number): Promise<Sale | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Sale;
};

export const createSale = async (
  data: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Sale> => {
  const snapshot = await collection.get();

  const ids = snapshot.docs
    .map((doc) => parseInt(doc.id, 10))
    .filter((n) => !Number.isNaN(n));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  const now = new Date().toISOString();

  const sale: Sale = {
    id: newId,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await collection.doc(newId.toString()).set(sale);

  return sale;
};

export const updateSale = async (
  id: number,
  data: Partial<Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Sale | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const existing = doc.data() as Sale;
  const updated: Sale = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  await docRef.set(updated);
  return updated;
};

export const deleteSale = async (id: number): Promise<boolean> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};
