import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Dealership API',
      version: '1.0.0',
      description:
        'API documentation for the Car Dealership backend. Includes authentication, CRUD operations, and rate limiting.',
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Use Firebase ID token as Bearer <token> obtained from Firebase Auth.',
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],

    tags: [
      { name: 'Vehicles', description: 'Vehicle management endpoints' },
      { name: 'Customers', description: 'Customer management endpoints' },
      { name: 'Sales', description: 'Sales management endpoints' },
      { name: 'Appointments', description: 'Appointment booking endpoints' },
      { name: 'Auth', description: 'Authentication & Authorization' },
    ],
  },

  apis: [
    './src/api/v1/routes/*.ts', // automatically loads routes with JSDoc comments
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const swaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📘 Swagger docs available at http://localhost:3000/api-docs');
};
