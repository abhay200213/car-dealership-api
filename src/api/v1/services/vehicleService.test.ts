import { Vehicle } from '../models/vehicle';

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    price: 20000,
    mileage: 15000,
    vin: 'TESTVIN123',
    color: 'Black',
    isAvailable: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  }
];

// These will be re-used in tests
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockDelete = jest.fn();

jest.mock('../../../config/firebase', () => {
  return {
    db: {
      collection: () => ({
        get: mockGet,
        doc: (id: string) => ({
          set: mockSet,
          get: mockGet,
          delete: mockDelete
        })
      })
    }
  };
});

// Import AFTER mock
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from './vehicleService';

describe('vehicleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllVehicles should return a list of vehicles from Firestore', async () => {
    mockGet.mockResolvedValueOnce({
      docs: mockVehicles.map((v) => ({ data: () => v }))
    } as any);

    const vehicles = await getAllVehicles();

    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toBe(1);
    expect(vehicles[0]).toMatchObject({
      id: 1,
      make: 'Toyota',
      model: 'Corolla'
    });
  });

  it('getVehicleById should return a single vehicle when it exists', async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockVehicles[0]
    } as any);

    const vehicle = await getVehicleById(1);

    expect(vehicle).not.toBeNull();
    expect(vehicle).toMatchObject({ id: 1, make: 'Toyota' });
  });

  it('getVehicleById should return null when vehicle does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const vehicle = await getVehicleById(999);

    expect(vehicle).toBeNull();
  });

  it('createVehicle should create a new vehicle with generated id', async () => {
    // First get() is used to compute newId, so we simulate an empty collection
    mockGet.mockResolvedValueOnce({
      docs: []
    } as any);

    const input = {
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      price: 25000,
      mileage: 5000,
      vin: 'HONDA123',
      color: 'Blue',
      isAvailable: true
    };

    const result = await createVehicle(input as any);

    expect(result.id).toBe(1);
    expect(result).toMatchObject(input);
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('updateVehicle should return updated vehicle when it exists', async () => {
    // first get() for existing
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockVehicles[0]
    } as any);

    const result = await updateVehicle(1, { price: 21000 });

    expect(result).not.toBeNull();
    expect(result?.price).toBe(21000);
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('updateVehicle should return null when vehicle does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const result = await updateVehicle(999, { price: 21000 });

    expect(result).toBeNull();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('deleteVehicle should return true when vehicle exists', async () => {
    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockVehicles[0]
    } as any);

    const result = await deleteVehicle(1);

    expect(result).toBe(true);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  it('deleteVehicle should return false when vehicle does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false
    } as any);

    const result = await deleteVehicle(999);

    expect(result).toBe(false);
    expect(mockDelete).not.toHaveBeenCalled();
  });
});
