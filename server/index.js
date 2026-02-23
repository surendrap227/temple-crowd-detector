const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Smart Crowd Monitoring System API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
