require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const { cloudinaryConnect } = require('./utils/cloudinaryUpload');

const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
// const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 9 * 1024 * 1024 },
}));

// Connect to MongoDB
connectDB();

cloudinaryConnect();

app.get('/', (req, res) => {
  res.send('Server is running with CORS enabled!');
});

// Mount routes
app.use('/', donationRoutes); // POST /create-order, /save-donation
app.use('/contact', contactRoutes); // POST /contact
app.use('/events', eventRoutes); // CRUD for events
app.use('/users', userRoutes); // signup, login
app.use('/team', teamRoutes); // CRUD for team members
// app.use('/api/registrations', registrationRoutes); // registration routes

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
