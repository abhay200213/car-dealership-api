export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  preferredContactMethod?: 'email' | 'phone';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
