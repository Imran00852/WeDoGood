# 🌍 WeDoGood – NGO Impact Reporting Platform

**WeDoGood** is a full-stack NGO impact reporting and analytics platform built with the **MERN stack**.  
It supports **manual report submissions** as well as **large-scale bulk CSV ingestion**, powered by **asynchronous background jobs** and **real-time status tracking**.

---

## 🔗 Live Links

- **Frontend (Vercel):** https://we-do-good-ten.vercel.app/
- **GitHub Repository:** https://github.com/Imran00852/WeDoGood
- **Postman API Docs:** https://documenter.getpostman.com/view/29319175/2sB3dTrnGs

---

## 🚀 Key Features

- Manual NGO report submission with schema validation
- Bulk CSV upload using background workers (**BullMQ + Redis**)
- Real-time job status tracking via Job ID
- Month-wise aggregated admin dashboard
- Duplicate record prevention using database-level constraints
- Scalable async processing for large datasets

---

## 🧠 High-Level Architecture

```
React + MUI + RTK Query
        ↓
Node.js + Express (REST APIs)
        ↓
BullMQ Queue + Redis (Upstash)
        ↓
MongoDB Atlas
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Material UI
- Redux Toolkit
- RTK Query

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- BullMQ
- Redis (Upstash)

### Infrastructure

- Render (API & Worker)
- Vercel (Frontend)
- Postman

---

## 🔗 API Endpoints

All endpoints are prefixed with **`/api/v1`**

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/report`                  | Submit a single NGO report      |
| POST   | `/reports/upload`          | Upload CSV for bulk processing  |
| GET    | `/jobs/:jobId`             | Get background job status       |
| GET    | `/dashboard?month=YYYY-MM` | Get month-wise aggregated stats |

---

## 📊 Sample Dashboard Response

```json
{
  "totalPeopleHelped": 7812,
  "totalEventsConducted": 315,
  "totalFundsUtilized": 3851753,
  "totalNGOsReporting": 33
}
```

---

## ⚙️ Environment Variables

### Backend & Worker

Create a `.env` file:

```env
MONGO_URI=your_mongodb_atlas_connection_string
REDIS_URL=your_upstash_redis_url
```

### Frontend

Create a `.env` file:

```env
VITE_SERVER=http://localhost:5000
```

---

## ▶️ Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Imran00852/WeDoGood.git
cd WeDoGood
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Worker Setup (CSV Processing)

Open a new terminal:

```bash
cd backend
node workers/csvWorker.js
```

---

### 4️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧪 API Testing

- Import the Postman collection
- Test manual submission, bulk upload, job tracking, and dashboard APIs

---

## 🧩 Engineering Highlights

- Async job processing using BullMQ
- Redis-backed queues for scalability
- Decoupled API & worker architecture
- Real-time progress tracking
- MongoDB indexes for data integrity

---

## 👨‍💻 Author

**Imran Bhat**  
GitHub: https://github.com/Imran00852
