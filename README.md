# Shopora 🛍️

**Shopora** is a modern, full-stack enterprise e-commerce platform built with a React 19 single-page application (SPA) frontend and a Node.js Express 5 TypeScript backend. Engineered for performance, scalability, and user experience, Shopora features real-time customer support, live video consultations, payment processing, CDN media management, and end-to-end telemetry.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [1. Repository Installation](#1-repository-installation)
  - [2. Environment Configuration](#2-environment-configuration)
  - [3. Database Setup & Migrations](#3-database-setup--migrations)
  - [4. Database Seeding](#4-database-seeding)
  - [5. Running the Application](#5-running-the-application)
- [Containerization & Docker](#containerization--docker)
- [Deployment](#deployment)
- [Webhook Endpoints](#webhook-endpoints)
- [API Reference Summary](#api-reference-summary)
- [License](#license)

---

## 🌟 Key Features

### 🛒 Storefront & Shopping Experience
- **Interactive Product Catalog**: Grid view featuring category filtering, live search, and product status badges.
- **Detailed Product Pages**: Comprehensive product specifications, pricing, real-time availability, and high-resolution imagery.
- **Reactive Shopping Cart**: Client-side cart state managed with Zustand, featuring persistent local storage and line item quantity controls.

### 🔐 Authentication & Role-Based Access Control (RBAC)
- **User Authentication**: Secure sign-in/sign-up powered by Clerk.
- **Granular Permissions**: Role-based access control supporting `customer`, `support`, and `admin` user tiers.

### 💳 Payments & Order Processing
- **Checkout Sessions**: Seamless order checkout flow integrated with Polar.sh.
- **Order Lifecycle Tracking**: Full tracking of order status (`pending`, `paid`, `failed`) and detailed order receipts.

### 💬 Real-Time Support Chat & Video Calls
- **In-App Support Chat**: Order-specific live messaging powered by Stream Chat.
- **Live Video Consultations**: Embedded video calling capabilities powered by Stream Video for direct support.

### 🛡️ Admin Dashboard & Asset Management
- **Product Administration**: Create, edit, deactive, and manage product listings.
- **CDN Asset Uploads**: Image optimization and cloud hosting integrated with ImageKit.

### 📊 Observability & Monitoring
- **Error Tracking & Profiling**: Full-stack Sentry integration for real-time error tracking and telemetry, synced with Clerk user profiles.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 19 + Vite + React Router v8
- **Styling & UI**: Tailwind CSS v4 + DaisyUI v5 + Lucide React Icons
- **State Management**: Zustand (client state) + TanStack React Query v5 (server state)
- **Auth & Monitoring**: Clerk React SDK + Sentry React SDK
- **Real-Time Communication**: Stream Chat React + Stream Video SDKs

### **Backend**
- **Runtime & Framework**: Node.js + Express 5 (TypeScript)
- **Database & ORM**: PostgreSQL + Drizzle ORM + Drizzle Kit
- **Authentication**: Clerk Express Middleware
- **Services & SDKs**: Polar.sh (Payments), ImageKit (Media CDN), Stream Chat (Support Tokens), Sentry (Error Telemetry)

---

## 📁 Project Structure

```
shopora/
├── backend/                  # Express + TypeScript API Server
│   ├── scripts/              # Database seeding scripts
│   ├── src/
│   │   ├── controllers/      # API route controllers
│   │   ├── db/               # Drizzle database schemas & connection setup
│   │   ├── lib/              # Core services (Cron, Env, Sentry, Stream, ImageKit)
│   │   ├── middlewares/      # Express middlewares (Auth, Sentry User Context)
│   │   ├── routes/           # Express routers (Me, Admin, Products, Orders, Checkout, Stream)
│   │   └── webhooks/         # Webhook event handlers (Clerk, Polar)
│   ├── drizzle.config.ts     # Drizzle Kit migration configuration
│   └── tsconfig.json         # TypeScript compiler configuration
├── frontend/                 # React 19 + Vite SPA Frontend
│   ├── public/               # Static assets & public assets
│   └── src/
│       ├── components/       # Reusable UI components & layouts
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Application routes & page views
│       ├── store/            # Zustand state stores (Cart, UI)
│       └── utils/            # Helper functions & formatting utilities
├── Dockerfile                # Multi-stage Docker build config
├── vercel.json               # Vercel multi-service routing config
└── README.md                 # Project documentation
```

---

## ⚙️ Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: `v22.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: Local database or a managed service (e.g. Neon, Supabase, Railway)

---

## 🚀 Project Setup

### 1. Repository Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/your-username/shopora.git
cd shopora
```

Install dependencies for both backend and frontend applications:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

cd ..
```

---

### 2. Environment Configuration

Environment configuration is managed via configuration files in both `backend` and `frontend` directories.

#### Backend Configuration:
Navigate to the `backend` directory and create your environment configuration file by copying `.env.example`:

```bash
cd backend
cp .env.example .env
```
Populate the configuration values in `.env` following the structure outlined in `.env.example`. This includes settings for your server port, database connection string, Clerk credentials, Sentry monitoring, Stream API keys, and ImageKit CDN keys.

#### Frontend Configuration:
Navigate to the `frontend` directory and create your environment configuration file by copying `.env.example`:

```bash
cd ../frontend
cp .env.example .env
```
Populate the client configuration values in `.env` following the structure outlined in `.env.example`. This includes client-side Clerk publishable keys and API URL settings.

---

### 3. Database Setup & Migrations

Shopora utilizes Drizzle ORM for database schema management. Apply the database schema to your PostgreSQL instance from the `backend` directory:

```bash
cd backend
npm run db:push
```

---

### 4. Database Seeding

Populate your database with sample catalog items (Audio, Wearables, Workspace, Home, Travel, Cameras, Accessories):

```bash
npm run db:seed
```

---

### 5. Running the Application

#### Start the Backend Server (Development Mode):
From the `backend` directory:

```bash
npm run dev
```
The Express server will start with hot reloading enabled via `tsx`.

#### Start the Frontend Application (Development Mode):
In a separate terminal, navigate to the `frontend` directory:

```bash
npm run dev
```
Open your browser and navigate to the local Vite development URL (typically `http://localhost:5173`).

---

## 🐳 Containerization & Docker

Shopora includes a multi-stage Dockerfile that compiles the Vite frontend SPA and serves it directly through the Express backend container.

### Build the Docker Image:

```bash
docker build -t shopora .
```

### Run the Container:

```bash
docker run -p 3001:3001 --env-file backend/.env shopora
```
Access the application at `http://localhost:3001`.

---

## ☁️ Deployment

### Vercel / Multi-Service Routing
The root directory includes a `vercel.json` routing configuration setup designed to deploy both the Vite SPA frontend and Express backend entry point (`src/index.ts`) as unified microservices.

---

## 🔔 Webhook Endpoints

The application exposes raw JSON webhook handlers for third-party service integration:

- **Clerk Webhook**: `/webhooks/clerk` — Handles user profile updates and sync events.
- **Polar Webhook**: `/webhooks/polar` — Processes real-time checkout session updates and payment confirmations.

---

## 📡 API Reference Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check endpoint | Public |
| `GET` | `/api/me` | Fetch authenticated user profile & role | Authenticated |
| `GET` | `/api/products` | Fetch product catalog & details | Public |
| `GET` | `/api/checkout` | Initiate Polar checkout session | Authenticated |
| `GET` | `/api/orders` | Fetch user order history & details | Authenticated |
| `POST` | `/api/stream` | Generate Stream support chat & video tokens | Authenticated |
| `ALL` | `/api/admin/*` | Admin product management & ImageKit upload signatures | Admin Role |

---

## 📄 License

This project is licensed under the ISC License.
