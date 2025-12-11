require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Added for folder check
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure 'tmp' folder exists for uploads
if (!fs.existsSync('./tmp')){
    fs.mkdirSync('./tmp');
}

// Database Connection
connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/local_dashboard');

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/dashboard', require('./routes/dashboard'));

app.get('/', (req, res) => res.send('API is Running...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));