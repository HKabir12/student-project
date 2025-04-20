require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route যুক্ত করো
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // ✅ এখন আর কমেন্ট নয়

app.get('/', (req, res) => {
  res.send("Student is serving");
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
