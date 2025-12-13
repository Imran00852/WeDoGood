# 🌍 WeDoGood – NGO Impact Reporting Platform

WeDoGood is a full-stack NGO reporting and analytics platform built using the MERN stack, designed to handle both manual and large-scale bulk data ingestion with asynchronous background processing and real-time tracking.

## 🔗 Live Links

- Frontend (Vercel): https://we-do-good-ten.vercel.app/
- GitHub Repository: https://github.com/Imran00852/WeDoGood
- Postman API Documentation: https://documenter.getpostman.com/view/29319175/2sB3dTrnGs

## 🚀 Key Features

- Manual NGO report submission with validation
- Bulk CSV upload with background processing (BullMQ + Redis)
- Real-time job status tracking
- Month-wise aggregated admin dashboard
- Duplicate prevention using database-level constraints

## 🧠 Architecture Overview

Frontend (React + MUI + RTK Query)  
→ Backend (Node.js + Express)  
→ BullMQ + Redis (Upstash)  
→ MongoDB Atlas

## 🛠️ Tech Stack

Frontend:

- React
- Material UI
- Redux Toolkit
- RTK Query

Backend:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- BullMQ
- Redis (Upstash)

Infrastructure:

- Render (API & Worker)
- Vercel (Frontend)
- Postman

## 🔗 API Endpoints (All prefixed with /api/v1)

POST /api/v1/report  
POST /api/v1/reports/upload  
GET /api/v1/jobs/:jobId  
GET /api/v1/dashboard?month=YYYY-MM

## 📊 Dashboard Response Example

{
"totalPeopleHelped": 7812,
"totalEventsConducted": 315,
"totalFundsUtilized": 3851753,
"totalNGOsReporting": 33
}

## ⚙️ Environment Variables

Backend / Worker:
MONGO_URI
REDIS_URL

Frontend:
VITE_SERVER

## ▶️ Running Locally

Backend:
npm install
npm run dev

Worker:
node workers/csvWorker.js

Frontend:
npm install
npm run dev

## 👨‍💻 Author

Imran Bhat  
GitHub: https://github.com/Imran00852
