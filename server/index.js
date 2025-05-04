require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');

const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Server is running with CORS enabled!');
});

// Mount routes
app.use('/', donationRoutes); // POST /create-order, /save-donation
app.use('/contact', contactRoutes); // POST /contact
app.use('/events', eventRoutes); // CRUD for events
app.use('/users', userRoutes); // signup, login

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
