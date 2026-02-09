# 🔗 URL Shortener with Analytics (MERN Stack)

A **full-stack, production-grade URL Shortener application** built using the **MERN stack**.  
It allows authenticated users to generate short URLs with expiry, track detailed click analytics, and view insights through an interactive dashboard.  
The project also uses **Redis (Upstash)** to cache redirects for high performance.

---

## 🚀 Project Idea

The goal of this project is to build a **real-world SaaS-style URL shortener**, similar to platforms like Bitly or TinyURL, but with:

- User authentication
- Expiry-based short links
- Click analytics (device, browser, geo, date)
- User-level dashboard insights
- Redis caching for fast redirects

This project focuses on **scalability, clean architecture, and performance**, not just CRUD.

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Redis (Upstash)

---
### Work Flow
GET /:shortCode
   ↓
Redis cache lookup
   ↓
(Cache hit) → redirect
(Cache miss) → MongoDB
   ↓
Expiry check
   ↓
Analytics logged
   ↓
Redirect to original URL

---

## ⚙️ Setup Instructions

- Backend
cd backend
npm install
npm run dev

- Frontend
cd frontend
npm install
npm run dev