# New Component Plan – express-rate-limit

## Overview

For my Car Dealership Management API, I am integrating `express-rate-limit` as a new back-end component. This middleware will limit how many requests a single client (IP) can make within a defined time window. It adds a real-world protection layer against abuse, brute-force attempts and accidental flooding.

This component was **not** built-in to the original course demos, so it demonstrates that I can research, select, and integrate a new back-end feature on my own.

---

## Why this component?

The API exposes multiple CRUD endpoints for:

- Vehicles
- Customers
- Sales
- Appointments

Without rate limiting, a misbehaving client could:

- spam requests and slow down the API for everyone,
- increase Firestore read/write costs unnecessarily,
- increase the risk of brute-force attempts on protected endpoints (e.g. admin operations).

Rate limiting is a standard best practice for production APIs and fits the course focus on **security and robustness**. It also keeps the scope manageable within the project timeline.

---

## Integration Plan

1. **Install the package**

   ```bash
   npm install express-rate-limit
