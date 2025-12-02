# Car Dealership API

Backend REST API for managing vehicles, customers, sales, and appointments for a car dealership.

Author: Abhay Singh

## Overview
The Car Dealership API is designed to manage various operations in a car dealership, including vehicle management, customer handling, appointment scheduling, sales recording, and role-based user management. This API supports CRUD (Create, Read, Update, Delete) operations for vehicles, customers, appointments, and sales. Additionally, it allows for advanced features like filtering and sorting of vehicles, sales, and appointments based on various parameters.

The API uses JWT (JSON Web Token) for secure authentication and role-based access control to ensure only authorized users can perform certain actions.

## Features
- **Vehicle Management**: Add, update, delete, and retrieve vehicles.
- **Customer Management**: Create, update, delete, and retrieve customer records.
- **Appointment Management**: Schedule, update, and delete customer-vehicle appointments.
- **Sale Management**: Record, update, and delete sales transactions.
- **Filtering and Sorting**: Filter and sort vehicles, sales, and appointments based on various criteria (e.g., price, date, vehicle model).
- **Admin Operations**: Assign roles to users and retrieve user roles.

## Authentication & Authorization

This API uses **Firebase Authentication** with **role-based access control**:

- Clients send a `Bearer <Firebase ID token>` in the `Authorization` header.
- The token is verified by Firebase Admin.
- Custom claims such as `role = "admin" | "manager" | "user"` are used to protect routes.

Examples:

- `admin` and `manager` can create, update, and delete vehicles, customers, sales, and appointments.
- `user` can view vehicles and create appointments.

Unauthorized or forbidden requests return **401** (no/invalid token) or **403** (insufficient role).

## Rate Limiting

The API uses `express-rate-limit` to prevent abuse.

- Each client IP is limited to a fixed number of requests per time window.
- If the limit is exceeded, the API responds with **429 Too Many Requests**.

This protects the backend from brute-force or accidental overload while keeping response times stable.

Setup Instructions
1. Install Dependencies
npm install

2. Firebase Setup

Create a Firebase project → Service Account → Generate private key JSON.

Place this JSON inside your .env as:

FIREBASE_SERVICE_ACCOUNT_KEY=YOUR_JSON_HERE


(This must be a single-line JSON string.)

3. Create .env file

See next section.

Environment Variables

Your .env must include:

PORT=3000

FIREBASE_SERVICE_ACCOUNT_KEY= {... full service account JSON ... }

BYPASS_AUTH=false

Running the Project
Development Mode
npm run dev

Build
npm run build

Production
npm start

API Documentation (Swagger)

Swagger UI automatically loads at:

http://localhost:3000/api-docs


Includes:

All CRUD endpoints

Authentication/authorization controls

Request/Response schemas

Authentication & Authorization
How Authentication Works

All protected endpoints require:

Authorization: Bearer <Firebase_ID_Token>


This token must come from Firebase Auth via a real user login.

Roles
Role	Permissions
Admin	Full access (CRUD on everything)
Manager	Manage vehicles, customers, appointments
User	Read-only access
Testing

Run all tests:

npm test


Includes:

Service tests (vehicle, appointment)

Validation tests

Rate limit tests

~74% global coverage

Git Workflow

The project uses Gitflow:

main → stable production
development → current sprint features
feature/* → per-feature branches


Example:

git checkout -b feature/vehicle-search
git add .
git commit -m "Add vehicle search service"
git push origin feature/vehicle-search

Milestones Completed
## Milestone 1

CRUD foundation

Firestore service layer

Initial tests

Gitflow structure

## Milestone 2

Working MVP

Component integrations

Rate limiting

Swagger docs

Sprint demo prep

## Milestone 3

Authentication + RBAC

Advanced filters

Complete documentation

Project polish

Expanded test suite