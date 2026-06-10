require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    family: 4
})
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.error("❌ MongoDB Connection Error");
    console.error(err);
    console.error("Name:", err.name);
    console.error("Message:", err.message);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running smoothly' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});