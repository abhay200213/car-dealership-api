export interface Appointment {
  id: number;
  customerId: number;
  vehicleId?: number;
  scheduledAt: string; // ISO string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
