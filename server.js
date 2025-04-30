const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // 👈 This wraps Express for Vercel
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Your existing routes
app.get('/api/subscription', (req, res) => {
  res.json({ status: 'Backend working on Vercel!' });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 👇 Export the app wrapped for Vercel
module.exports.handler = serverless(app);
