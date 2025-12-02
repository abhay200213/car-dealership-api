import { db } from '../../../config/firebase';
import { Customer } from '../models/customer';

const collection = db.collection('customers');

export const getAllCustomers = async (): Promise<Customer[]> => {
  const snapshot = await collection.get();
  return snapshot.docs.map((doc) => doc.data() as Customer);
};

export const getCustomerById = async (id: number): Promise<Customer | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data() as Customer;
};

export const createCustomer = async (
  data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Customer> => {
  const snapshot = await collection.get();

  const ids = snapshot.docs
    .map((doc) => parseInt(doc.id, 10))
    .filter((n) => !Number.isNaN(n));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
  const now = new Date().toISOString();

  const customer: Customer = {
    id: newId,
    ...data,
    createdAt: now,
    updatedAt: now
  };

  await collection.doc(newId.toString()).set(customer);

  return customer;
};

export const updateCustomer = async (
  id: number,
  data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Customer | null> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const existing = doc.data() as Customer;
  const updated: Customer = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };

  await docRef.set(updated);
  return updated;
};

export const deleteCustomer = async (id: number): Promise<boolean> => {
  const docRef = collection.doc(id.toString());
  const doc = await docRef.get();

  if (!doc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};
