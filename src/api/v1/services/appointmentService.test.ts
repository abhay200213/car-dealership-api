import { Appointment } from '../models/appointment';

const mockAppointments: Appointment[] = [
  {
    id: 1,
    customerId: 1,
    vehicleId: 1,
    scheduledAt: '2024-01-01T10:00:00.000Z',
    status: 'scheduled',
    notes: 'Initial appointment',
    createdAt: '2024-01-01T09:00:00.000Z',
    updatedAt: '2024-01-01T09:00:00.000Z'
  }
];

const mockGet = jest.fn();
const mockSet = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../../config/firebase', () => {
  return {
    db: {
      collection: () => ({
        get: mockGet,
        doc: (id: string) => ({
          get: mockGet,
          set: mockSet,
          delete: mockDelete
        })
      })
    }
  };
});

// import AFTER mock
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from './appointmentService';

describe('appointmentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllAppointments should return a list of appointments', async () => {
    mockGet.mockResolvedValueOnce({
      docs: mockAppointments.map((a) => ({ data: () => a }))
    } as any);

    const appointments = await getAllAppointments();

    expect(Array.isArray(appointments)).toBe(true);
    expect(appointments.length).toBe(1);
    expect(appointments[0]).toMatchObject({
      id: 1,
      customerId: 1,
      status: 'scheduled'
    });
  });

  it('getAppointmentById should return a single appointment when it exists', async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockAppointments[0]
    } as any);

    const appointment = await getAppointmentById(1);

    expect(appointment).not.toBeNull();
    expect(appointment).toMatchObject({
      id: 1,
      customerId: 1
    });
  });

  it('getAppointmentById should return null when appointment does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const appointment = await getAppointmentById(999);

    expect(appointment).toBeNull();
  });

  it('createAppointment should create a new appointment with default status if not provided', async () => {
    // first get() -> compute new id; simulate no existing docs
    mockGet.mockResolvedValueOnce({
      docs: []
    } as any);

    const input = {
      customerId: 2,
      vehicleId: 3,
      scheduledAt: '2024-02-01T10:00:00.000Z',
      notes: 'New booking'
      // no status -> should default to "scheduled"
    };

    const result = await createAppointment(input as any);

    expect(result.id).toBe(1);
    expect(result.customerId).toBe(2);
    expect(result.status).toBe('scheduled');
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('updateAppointment should return updated appointment when it exists', async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockAppointments[0]
    } as any);

    const result = await updateAppointment(1, {
      status: 'completed',
      notes: 'Done'
    });

    expect(result).not.toBeNull();
    expect(result?.status).toBe('completed');
    expect(result?.notes).toBe('Done');
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('updateAppointment should return null when appointment does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const result = await updateAppointment(999, { status: 'cancelled' });

    expect(result).toBeNull();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('deleteAppointment should return true when appointment exists', async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockAppointments[0]
    } as any);

    const result = await deleteAppointment(1);

    expect(result).toBe(true);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it('deleteAppointment should return false when appointment does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const result = await deleteAppointment(999);

    expect(result).toBe(false);
    expect(mockDelete).not.toHaveBeenCalled();
  });
});
