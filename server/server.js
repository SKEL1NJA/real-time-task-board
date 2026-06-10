require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Task = require('./models/Task'); // Import Task Model

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { family: 4 })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- HTTP API ROUTES ---

// 1. Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching tasks' });
    }
});

// 2. Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title });
        await newTask.save();

        io.emit('task_created', newTask);
        
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Server error creating task' });
    }
});

// 3. Update a task's status
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        
        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

        io.emit('task_updated', updatedTask);
        
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Server error updating task' });
    }
});

// 4. Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ error: 'Task not found' });

        io.emit('task_deleted', req.params.id);
        
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error deleting task' });
    }
});

// --- WEBSOCKET REAL-TIME ORCHESTRATION ---
io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`❌ Client disconnected: ${socket.id}`));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});