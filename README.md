# HCL_hackthon_repo

# Healthcare Wellness & Preventive Care Portal (MVP)

> A secure, scalable, and responsive healthcare portal designed to help patients achieve wellness goals and maintain compliance with preventive checkups.

## 📋 Project Overview
This project is a **Minimum Viable Product (MVP)** developed to demonstrate a comprehensive solution for a Healthcare Wellness and Preventive Care Portal. The application focuses on usability, security, and personalization, adhering to healthcare data protection standards.

**Key Objectives:**
* **Preventive Care:** Reminders for annual checkups and vaccinations.
* **Wellness Tracking:** Dashboard for tracking daily steps, sleep, and active calories.
* **Compliance:** Role-based access for Healthcare Providers to monitor patient status.
* **Security:** robust authentication, audit logging, and data privacy.

## 🏗 Architecture
The application follows a **Three-Tier Architecture**:
1.  **Client Layer:** Single Page Application (SPA) built with **React.js**.
2.  **Application Layer:** REST API server implemented in **Node.js with Express**.
3.  **Data Layer:** **MongoDB** (NoSQL) for flexible storage of user profiles, goals, and logs.

## 🚀 Tech Stack
* **Frontend:** ReactJS, CSS Modules/Sass, Recharts (for data viz).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Atlas/Local).
* **Authentication:** JWT (JSON Web Tokens) with session management.
* **DevOps:** GitHub Actions (CI/CD), Docker (Optional).

## ✨ Key Features

### 👤 For Patients
* **Secure Dashboard:** View wellness progress (Steps, Active Time, Sleep) with visual graphs.
* **Goal Tracker:** Log daily activities and set targets (e.g., 6000 steps/day).
* **Preventive Reminders:** Notifications for upcoming blood tests, flu shots, and checkups.
* **Health Tips:** Daily curated health advice (e.g., Hydration, Mental Health awareness).
* **Profile Management:** Manage personal health data (Allergies, Medications).

### 🩺 For Healthcare Providers
* **Patient List:** View all assigned patients.
* **Compliance Monitoring:** distinctive flags for patients who have "Met Goals" or "Missed Checkups".
* **Detailed View:** Inspect specific patient progress to inform care plans.

### 🔒 Security & Privacy
* **RBAC (Role-Based Access Control):** Strict separation between Patient and Provider data access.
* **Audit Logging:** Tracks all data access and modifications (Who accessed What and When).
* **Data Protection:** Password hashing (bcrypt), TLS encryption in transit, and consent management.

## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v14+)
* MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/healthcare-wellness-portal.git](https://github.com/your-username/healthcare-wellness-portal.git)
cd healthcare-wellness-portal
