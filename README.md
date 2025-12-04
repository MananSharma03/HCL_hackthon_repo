# Healthcare Wellness & Preventive Care Portal (MVP)

> A secure, scalable, and responsive healthcare portal designed to facilitate wellness tracking, preventive care compliance, and secure patient-provider interaction.

## 📖 Project Overview
[cite_start]This project is a **Minimum Viable Product (MVP)** developed to solve the need for a unified Healthcare Wellness and Preventive Care Portal[cite: 3]. [cite_start]The solution focuses on usability, security, and personalization, helping patients achieve health goals while ensuring healthcare privacy standards[cite: 5, 6].

**Key Objectives:**
* [cite_start]**Wellness Tracking:** Enable patients to track steps, sleep, and active time [cite: 28-31].
* [cite_start]**Preventive Care:** Automate reminders for checkups (e.g., annual blood tests) and vaccinations[cite: 32, 33].
* [cite_start]**Provider Compliance:** Provide healthcare providers with tools to monitor patient compliance with preventive measures[cite: 42].
* [cite_start]**Security First:** Prioritizes secure authentication, role-based access control (RBAC), and audit logging[cite: 47, 79].

---

## 🏗 System Architecture
[cite_start]The application follows a robust **Three-Tier Web Application** architecture[cite: 100]:

1.  [cite_start]**Client Layer:** A Single Page Application (SPA) built with **ReactJS** or **NextJS** that runs in the browser[cite: 101].
2.  [cite_start]**Application Layer:** A REST API server implemented in **Node.js with Express** (or Python Django) that enforces business logic and security[cite: 102].
3.  [cite_start]**Data Layer:** A NoSQL database (**MongoDB**) for storing user profiles, goals, reminders, and audit logs[cite: 103].

### Deployment & DevOps
* [cite_start]**CI/CD:** Automated testing and deployment via GitHub Actions.
* [cite_start]**Hosting:** Frontend on static hosts (Vercel/Netlify), Backend on managed hosts (Render/Railway)[cite: 127, 128].

---

## 🛠 Tech Stack

* [cite_start]**Frontend:** ReactJS / NextJS, CSS Modules/Sass[cite: 83, 84].
* [cite_start]**Backend:** Node.js (Express) or Python (Django)[cite: 86].
* [cite_start]**Database:** NoSQL (MongoDB, DynamoDB, or Firestore)[cite: 87].
* [cite_start]**Authentication:** JWT (JSON Web Tokens) with session expiration[cite: 61, 90].
* [cite_start]**Security:** Bcrypt password hashing, HTTPS/TLS, RBAC middleware [cite: 200-202].

---

## ✨ Key Features

### 👤 Patient Dashboard
* [cite_start]**Wellness Goals:** Visual tracking of steps (target vs. actual), active time, and sleep duration [cite: 29-31].
* [cite_start]**Preventive Reminders:** Alerts for upcoming events like "Annual blood test"[cite: 33, 65].
* [cite_start]**Health Tips:** Daily advice (e.g., hydration goals)[cite: 34, 35].
* [cite_start]**Profile Management:** View and edit basic health info, allergies, and medications[cite: 69, 70].

### 🩺 Provider Dashboard
* [cite_start]**Patient List:** View all assigned patients[cite: 72].
* [cite_start]**Compliance Status:** Quickly identify patients who have "Met Goals" or "Missed Preventive Checkup"[cite: 72].
* [cite_start]**Detailed View:** Clickable patient summaries to review specific goals and history[cite: 73].

### 🌐 Public Resources
* [cite_start]**Health Information:** Static pages regarding COVID-19 updates, Seasonal Flu prevention, and Mental Health awareness [cite: 20-25].

### 🔒 Security & Compliance
* [cite_start]**Audit Logging:** Tracks sensitive operations (e.g., `viewProfile`, `updateGoal`) with timestamps[cite: 167, 203].
* [cite_start]**Data Protection:** Data encryption at rest and in transit[cite: 208, 209].
* [cite_start]**Consent:** Registration includes data usage consent[cite: 80].

---

## 💾 Data Model
[cite_start]The database utilizes a flexible NoSQL schema with the following primary collections[cite: 119, 140]:

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| **User** | `email`, `passwordHash`, `role` (patient/provider), `profile` | [cite_start]Stores auth & profile data [cite: 141-149]. |
| **Goal** | `userId`, `goalType` (steps/sleep), `targetValue`, `progressValue` | [cite_start]Tracks daily wellness progress [cite: 151-154]. |
| **Reminder** | `userId`, `title`, `dueDate`, `status` | [cite_start]Stores preventive care alerts [cite: 157-162]. |
| **AuditLog** | `userId`, `action`, `targetResource`, `timestamp` | [cite_start]Security logs for data access [cite: 164-169]. |
| **PublicContent**| `title`, `body`, `tags` | [cite_start]General health information content [cite: 171-175]. |

---

## 🔌 API Endpoints
[cite_start]The backend exposes a RESTful API[cite: 92, 176]:

### Authentication
* [cite_start]`POST /api/auth/register` - Register a new user[cite: 178].
* [cite_start]`POST /api/auth/login` - Login and receive JWT[cite: 179].

### Users & Profiles
* [cite_start]`GET /api/users/me` - Fetch current user profile[cite: 182].
* [cite_start]`PUT /api/users/me` - Update profile details[cite: 183].

### Goals & Reminders
* [cite_start]`GET /api/goals` - Retrieve user goals[cite: 185].
* [cite_start]`POST /api/goals` - Create or log a goal[cite: 186].
* [cite_start]`PUT /api/goals/:id` - Update goal progress[cite: 187].
* [cite_start]`GET /api/reminders` - Fetch preventive reminders[cite: 190].

### Provider Access
* [cite_start]`GET /api/provider/patients` - List patients with compliance status[cite: 195].
* [cite_start]`GET /api/provider/patients/:id` - Get detailed patient view[cite: 196].

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js & npm
* MongoDB Instance (Local or Atlas)

### 1. Clone Repository
```bash
git clone [https://github.com/your-username/wellness-portal.git](https://github.com/your-username/wellness-portal.git)
cd wellness-portal
