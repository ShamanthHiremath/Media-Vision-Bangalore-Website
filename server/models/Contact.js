const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

// exports and added to the module.exports object
module.exports = mongoose.model('Contact', contactSchema); 