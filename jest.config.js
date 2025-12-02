/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
collectCoverageFrom: [
  'src/api/v1/services/**/*.ts',
  'src/api/v1/controllers/**/*.ts',
  'src/validation/**/*.ts'
]
};
