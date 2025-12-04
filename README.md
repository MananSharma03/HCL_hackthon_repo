# Health & Wellness Portal

This is a simple web application for tracking health goals and reminders. It connects patients with providers.

## How it Works

The project is built with two main parts:

1.  **Frontend (Client)**: The user interface you see in the browser. Built with React.
2.  **Backend (Server)**: The logic that handles data and API requests. Built with Node.js and Express.

### Key Files

*   `server/index.ts`: The entry point. It starts the server.
*   `server/routes.ts`: Defines the API endpoints (like `/api/login`, `/api/goals`). This is where the backend logic lives.
*   `server/storage.ts`: Handles data storage. Currently, it saves data in memory (RAM), so it resets when you restart the server.
*   `client/src/App.tsx`: The main frontend component that handles routing (switching pages).

## How to Run

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the app**:
    ```bash
    npm run dev
    ```

3.  **Open in browser**:
    Go to `http://localhost:5000`

## Features

*   **Login/Register**: Create an account to start tracking.
*   **Dashboard**: See your health overview.
*   **Goals**: Set and track daily goals (steps, water, sleep).
*   **Reminders**: Get reminders for appointments and medications.
