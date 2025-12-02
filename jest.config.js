/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
collectCoverageFrom: [
  'src/api/v1/services/vehicleService.ts',
  'src/api/v1/services/appointmentService.ts',
  'src/validation/**/*.ts'
]
};
