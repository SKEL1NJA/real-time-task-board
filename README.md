# 📋 LiveTask Board — Real-Time Collaborative Kanban

A full-stack, real-time collaborative task management board. Built with a decoupled architecture, this application features a blazing-fast static frontend and a persistent WebSocket backend, allowing multiple users to update, move, and delete tasks instantly across different devices without refreshing the page.

---

## ✨ Features

- **Real-Time Synchronization:** WebSockets ensure all connected clients see updates instantly.
- **Kanban Workflow:** Intuitive To Do, In Progress, and Done columns.
- **Persistent Storage:** MongoDB securely stores all tasks and their current states.
- **Responsive UI:** Clean, modern, and mobile-friendly interface powered by Tailwind CSS.
- **Decoupled Architecture:** Frontend and backend are completely separated and communicate via REST APIs and Socket.io with CORS configured.

---

## 🛠️ Tech Stack

**Frontend** *(Deployed on Vercel)*

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Logic | JavaScript (Vanilla) |
| Styling | Tailwind CSS (CDN) |
| Realtime | Socket.io-client |

**Backend** *(Deployed on Render)*

| Layer | Technology |
|---|---|
| Runtime | Node.js & Express.js |
| Realtime | Socket.io (WebSockets) |
| Database | MongoDB & Mongoose |
| Config | CORS & dotenv |

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- A MongoDB cluster (e.g., MongoDB Atlas free tier)

### 1. Clone the Repository

```bash
git clone https://github.com/SKEL1NJA/real-time-task-board.git
cd real-time-task-board
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add your MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb://yourUsername:yourPassword@cluster.../taskboard?ssl=true&authSource=admin
```

> Be sure to use the correct driver connection string to bypass strict network firewalls if needed.

### 4. Run the Application

Start the development server with auto-restarting enabled:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5000`. Open a second window to test the real-time features!

---

## 🌍 Deployment Architecture

This project is built to be deployed in a decoupled environment:

1. **Backend (Render):** The Node.js server runs as a Web Service on Render, providing the persistent WebSocket connection and REST API endpoints.
2. **Frontend (Vercel):** The `public` folder is deployed as a static site on Vercel.
3. **Communication:** The frontend HTML points directly to the live Render URL for both REST fetches and Socket.io handshakes.

---

## 🔮 Future Enhancements

- **Drag-and-Drop:** Implement the HTML5 Drag and Drop API for moving task cards.
- **User Authentication:** Add login functionality to track who creates or moves specific tasks.
- **Task Details:** Add a modal to tasks for descriptions, due dates, and color labels.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).