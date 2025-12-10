# Task Management Application

A simple task management web application (backend + frontend) built with Node.js, Express and MongoDB for the backend and Vite + a JavaScript frontend for the client. This repository contains the source code for both backend and frontend parts.

Features
- User registration and authentication (JWT)
- Create, read, update and delete tasks
- REST API for tasks and users
- Example environment files for local development and deployment

Tech stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: Vite, JavaScript
- Database: MongoDB Atlas

Repository structure
- backend/ - Express API and server code
- frontend/ - Vite frontend application

Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

Quick start (development)
1. Clone the repo
   git clone https://github.com/Ishikaza-das/Task-Management-Application.git
2. Backend
   - cd backend
   - copy backend/.env.demo to backend/.env and update values if needed
   - npm install
   - npm run dev (or npm start)
   The backend will run on the PORT set in your .env (default 5000).
3. Frontend
   - cd frontend
   - copy frontend/.env.demo to frontend/.env and update values if needed
   - npm install
   - npm run dev
   The frontend Vite dev server runs on the port shown by Vite (commonly 5173).

Environment variables

Backend (backend/.env.demo)
- MONGO_URI - MongoDB connection string
- PORT - Port the backend listens on (default: 5000)
- JWT_SECRET_KEY - Secret used to sign JWT tokens
- FRONTEND - Frontend origin allowed (for CORS, optional)

Frontend (frontend/.env.demo)
- VITE_USER_API - Full URL to the users API endpoint
- VITE_TASK_API - Full URL to the tasks API endpoint

Hosted Url
- Frontend - https://task-management-application-frontend-l542.onrender.com
- Backend - https://task-management-application-backend-jtn6.onrender.com

Notes about secrets
- The demo environment files in this repository contain example values provided by the project owner. For security, do not commit production secrets. Replace these with your own credentials before deploying to production.

Deploying
- Update backend/.env with production values and a secure JWT secret
- Build the frontend (npm run build) and host on a static hosting provider, or serve from a hosting platform of your choice
- Ensure FRONTEND in the backend .env is set to your deployed frontend URL to avoid CORS issues

License
- Add your license information here.
