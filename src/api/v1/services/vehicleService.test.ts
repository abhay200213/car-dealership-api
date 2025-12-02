import { Vehicle } from '../models/vehicle';

// IMPORTANT: mock the firebase config module used by vehicleService
jest.mock('../../../config/firebase', () => {
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

  const mockGet = jest.fn().mockResolvedValue({
    docs: mockVehicles.map((v) => ({
      data: () => v
    }))
  } as any);

  return {
    db: {
      collection: () => ({
        get: jest.fn().mockResolvedValue({
          docs: mockVehicles.map((v) => ({
            data: () => v
          }))
        })
      })
    }
  };
});

// Import AFTER mock so it uses the mocked db
import { getAllVehicles } from './vehicleService';

describe('vehicleService', () => {
  it('getAllVehicles should return a list of vehicles from Firestore', async () => {
    const vehicles = await getAllVehicles();

    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toBe(1);
    expect(vehicles[0]).toMatchObject({
      id: 1,
      make: 'Toyota',
      model: 'Corolla'
    });
  });
});
