# Healthcare Wellness & Preventive Care Portal (MVP)

> A secure, scalable, and responsive healthcare portal designed to facilitate wellness tracking, preventive care compliance, and secure patient-provider interaction.

## 📖 Project Overview
This project is a **Minimum Viable Product (MVP)** developed to solve the need for a unified Healthcare Wellness and Preventive Care Portal. The solution focuses on usability, security, and personalization, helping patients achieve health goals while ensuring healthcare privacy standards.

**Key Objectives:**
* **Wellness Tracking:** Enable patients to track steps, sleep, and active time.
* **Preventive Care:** Automate reminders for checkups (e.g., annual blood tests) and vaccinations.
* **Provider Compliance:** Provide healthcare providers with tools to monitor patient compliance with preventive measures.
* **Security First:** Prioritizes secure authentication, role-based access control (RBAC), and audit logging.

---

## 🏗 System Architecture
The application follows a robust **Three-Tier Web Application** architecture:

1.  **Client Layer:** A Single Page Application (SPA) built with **ReactJS** that runs in the browser.
2.  **Application Layer:** A REST API server implemented in **Node.js with Express** that enforces business logic and security.
3.  **Data Layer:** A NoSQL database (**MongoDB**) for storing user profiles, goals, reminders, and audit logs.

### Deployment & DevOps
* **CI/CD:** Automated testing and deployment via GitHub Actions.
* **Hosting:** Frontend on static hosts (Vercel/Netlify), Backend on managed hosts (Render/Railway).

---

## 🛠 Tech Stack

* **Frontend:** ReactJS, CSS Modules.
* **Backend:** Node.js (Express)
* **Database:** NoSQL (MongoDB)
* **Authentication:** JWT (JSON Web Tokens) with session expiration.
* **Security:** Bcrypt password hashing, HTTPS/TLS.

---

## ✨ Key Features

### 👤 Patient Dashboard
* **Wellness Goals:** Visual tracking of steps (target vs. actual), active time, and sleep duration.
* **Preventive Reminders:** Alerts for upcoming events like "Annual blood test".
* **Health Tips:** Daily advice (e.g., hydration goals).
* **Profile Management:** View and edit basic health info, allergies, and medications.

### 🩺 Provider Dashboard
* **Patient List:** View all assigned patients.
* **Compliance Status:** Quickly identify patients who have "Met Goals" or "Missed Preventive Checkup".
* **Detailed View:** Clickable patient summaries to review specific goals and history.

### 🌐 Public Resources
* **Health Information:** Static pages regarding COVID-19 updates, Seasonal Flu prevention, and Mental Health awareness.

### 🔒 Security & Compliance
* **Audit Logging:** Tracks sensitive operations (e.g., `viewProfile`, `updateGoal`) with timestamps.
* **Data Protection:** Data encryption at rest and in transit.
* **Consent:** Registration includes data usage consent.

---

## 💾 Data Model
The database utilizes a flexible NoSQL schema with the following primary collections:

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| **User** | `email`, `passwordHash`, `role` (patient/provider), `profile` | Stores auth & profile data. |
| **Goal** | `userId`, `goalType` (steps/sleep), `targetValue`, `progressValue` | Tracks daily wellness progress. |
| **Reminder** | `userId`, `title`, `dueDate`, `status` | Stores preventive care alerts. |
| **AuditLog** | `userId`, `action`, `targetResource`, `timestamp` | Security logs for data access. |
| **PublicContent**| `title`, `body`, `tags` | General health information content. |

---

## 🔌 API Endpoints
The backend exposes a RESTful API:

### Authentication
* `POST /api/auth/register` - Register a new user.
* `POST /api/auth/login` - Login and receive JWT.

### Users & Profiles
* `GET /api/users/me` - Fetch current user profile.
* `PUT /api/users/me` - Update profile details.

### Goals & Reminders
* `GET /api/goals` - Retrieve user goals.
* `POST /api/goals` - Create or log a goal.
* `PUT /api/goals/:id` - Update goal progress.
* `GET /api/reminders` - Fetch preventive reminders.

### Provider Access
* `GET /api/provider/patients` - List patients with compliance status.
* `GET /api/provider/patients/:id` - Get detailed patient view.

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js & npm
* MongoDB Instance (Local or Atlas)

### 1. Clone Repository
```bash
git clone [https://github.com/your-username/wellness-portal.git](https://github.com/your-username/wellness-portal.git)
cd wellness-portal
