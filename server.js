// ✅ Use only CommonJS syntax
const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // For Vercel
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/api/subscription', (req, res) => {
  res.json({ status: 'Backend working on Vercel!' });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Export the app for Vercel
module.exports.handler = serverless(app);
