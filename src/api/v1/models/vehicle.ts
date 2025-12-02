export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  vin?: string;
  color?: string;
  isAvailable: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
