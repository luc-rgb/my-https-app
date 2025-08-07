require('dotenv').config();
const fs = require('fs');
const https = require('https');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/test', async (req, res) => {
  try {
    const collections = await db.listCollections().toArray();
    const names = collections.map(col => col.name);
    res.json({ status: "ok", collections: names });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


// HTTPS server setup
const sslOptions = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem')
};

https.createServer(sslOptions, app).listen(443, () => {
  console.log('HTTPS Server is running on port 443');
});
