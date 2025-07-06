# Jeeny Ride App

**Project Demo Video:**
**[Watch Demo on Loom](https://www.loom.com/share/3a2de1d766fe4c389f1ad3e34f2c885b?sid=07d3bfaf-538a-477b-b3b3-03f75c139fc1)**

## Project Overview

A React-based ride-hailing application that allows users to book and manage rides.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Navigation bar component
│   └── RideCard/       # Ride information display component
├── context/
│   └── AuthContext.jsx # Authentication state management
├── pages/              # Main application pages
│   ├── Login/          # User login page
│   ├── Register/       # New user registration
│   ├── RequestRide/    # Ride booking form
│   ├── RideStatus/     # Current ride status
│   └── RideHistory/    # Past rides history
└── App.js              # Main application component and routing
```

## Features

- User authentication (login/register)
- Ride booking system
- Multiple ride types (Car, Bike, Rickshaw)
- Ride status tracking
- Ride history viewing

## Local Storage Structure

- `jeeny_user`: Current logged-in user data
- `jeeny_users`: Registered users database
- `jeeny_rides`: Ride bookings database

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view the app

## Available Scripts

- `npm start`: Run development server
- `npm test`: Run tests
- `npm run build`: Create production build
