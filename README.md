# Feedants Competition Platform

A complete full-stack React Native application that replicates the Feedants "Competition Details" screen. Built with a modern tech stack focused on performance, modularity, and production-ready concurrency management.

## 🚀 Features

- **End-to-End Functionality**: Fully functional mobile frontend integrated with a RESTful backend API.
- **Concurrency-Safe Registration**: The backend uses atomic MongoDB operations (`findOneAndUpdate` with `$inc` and conditional guards) and unique compound indexes to guarantee that no user can register twice and race conditions during registration are impossible (e.g. when multiple users try to take the last available spot).
- **Dynamic Competition State**: Competition state (Upcoming, Open, Full, Closed) is computed dynamically on the server based on registration dates and participant limits, rather than a hardcoded static field.
- **Real-time Countdown**: The React Native frontend features a custom hook `useCountdown` that updates every second and automatically refetches competition data when the timer expires.
- **State-Driven UI**: The primary action button handles 8 different states seamlessly (Login to Register, Register, Registered, Upload, Competition Full, etc.).
- **Reusable Component Architecture**: The mobile UI is broken down into 15+ highly reusable and modular components using a centralized design system.

## 🛠️ Tech Stack

### Frontend (Mobile)
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: TanStack Query (React Query)
- **Navigation**: React Navigation (Native Stack)
- **Networking**: Axios (with centralized JWT interceptors)
- **Storage**: AsyncStorage

### Backend (Server)
- **Framework**: Node.js & Express.js
- **Language**: TypeScript
- **Database**: MongoDB & Mongoose
- **Authentication**: JWT & bcryptjs
- **Security**: Helmet, express-rate-limit, cors
- **Validation**: express-validator

---

## 📁 Project Structure (Monorepo)

```
feedants/
├── mobile/                 # React Native Frontend
│   ├── src/
│   │   ├── api/            # Axios clients and endpoints
│   │   ├── components/     # 15+ reusable UI components
│   │   ├── constants/      # App-wide constants
│   │   ├── hooks/          # React Query and custom hooks
│   │   ├── navigation/     # React Navigation setup
│   │   ├── screens/        # Screen components
│   │   ├── services/       # Auth and storage services
│   │   ├── theme/          # Centralized colors, typography, spacing
│   │   └── types/          # TypeScript interfaces
│   └── App.tsx             # Entry point
│
└── server/                 # Express Backend
    ├── src/
    │   ├── config/         # Database and ENV configuration
    │   ├── controllers/    # Request handlers
    │   ├── middleware/     # Auth, error handling, rate limiting
    │   ├── models/         # Mongoose schemas
    │   ├── routes/         # Express routes
    │   ├── seeds/          # Database seeding scripts
    │   ├── services/       # Business logic
    │   ├── types/          # TypeScript interfaces
    │   └── utils/          # Custom error classes
    └── server.ts           # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `mongodb://localhost:27017` or update `.env`)
- Expo CLI

### 1. Server Setup

```bash
cd server
npm install

# Copy environment variables
cp .env.example .env

# Seed the database with demo data (CRITICAL for testing the UI)
npm run seed

# Start the development server
npm run dev
```

The server will start on `http://localhost:5000`.

### 2. Mobile Setup

```bash
cd mobile
npm install

# Copy environment variables
cp .env.example .env

# Start the Expo development server
npm start
```

Use the Expo Go app on your phone, or run on an iOS Simulator (`i`) or Android Emulator (`a`).

> **Note for Android Emulator**: The `API_BASE_URL` in `mobile/src/constants/index.ts` automatically switches to `http://10.0.2.2:5000/api` for Android so it can reach the local machine's localhost.

---

## 🔐 Demo Credentials

The seed script automatically generates a demo user and a competition that perfectly matches the screenshot.

- **Email**: `demo@feedants.com`
- **Password**: `Demo@123`

You can use these credentials in the app to login and register for the seeded "Feedants Classical Dance" competition.

---

## 🧠 Architectural Highlights

### Concurrency-Safe Registration (Backend)
Handling competition registrations in a concurrent environment is tricky. The backend handles this robustly in `participationController.ts`:

```typescript
// ATOMIC operation - increment participantCount only if spots available
const updatedCompetition = await Competition.findOneAndUpdate(
  {
    _id: competitionId,
    participantCount: { $lt: competition.maxParticipants }, // Guard
  },
  { $inc: { participantCount: 1 } },
  { new: true }
);

// If updatedCompetition is null, another request took the last spot.
```

### Centralized Theme System (Frontend)
The mobile app strictly avoids hardcoded styles by relying on a centralized theme in `mobile/src/theme/`.

```typescript
import { colors, typography, spacing, borderRadius } from '../theme';

// Usage
style={{ backgroundColor: colors.primary, padding: spacing.md }}
```

### React Query Data Flow
Data fetching, caching, and mutation state are managed by TanStack Query.
When a user registers via `useRegister`, the hook automatically invalidates both the competition details and the participation status, ensuring the UI updates instantly without manual state manipulation.
