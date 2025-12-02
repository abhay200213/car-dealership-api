export interface Sale {
  id: number;
  vehicleId: number;
  customerId: number;
  salePrice: number;
  saleDate: string; // ISO string
  salespersonId?: string; // could be Firebase uid
  notes?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
