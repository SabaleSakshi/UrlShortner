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
## URL Shortening Flow

```mermaid
flowchart TD
    A[Client] --> B[GET /:shortCode]
    B --> C{Redis Cache}
    
    C -->|Cache Hit| D[Redirect]
    C -->|Cache Miss| E[MongoDB Lookup]
    E --> F{Expiry Check}
    F -->|Valid| G[Log Analytics]
    G --> H[Redirect]
    F -->|Expired| I[Return 404/Error]
    
    style A fill:#e1f5fe
    style D fill:#c8e6c9
    style H fill:#c8e6c9
    style I fill:#ffcdd2


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