const Contact = require('../models/Contact');

exports.saveContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 