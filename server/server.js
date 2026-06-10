require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    family: 4
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

io.on('connection', (socket) => {
    console.log(`🔌 A user connected: ${socket.id}`);

    socket.on('task_updated', (data) => {
        console.log('📋 Task update received:', data);
        socket.broadcast.emit('task_updated', data);
    });

    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server and WebSockets are ready' });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});