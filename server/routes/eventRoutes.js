const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create
router.post('/', eventController.createEvent);
// Read all
router.get('/', eventController.getEvents);
// Read one
router.get('/:id', eventController.getEventById);
// Update
router.put('/:id', eventController.updateEvent);
// Delete
router.delete('/:id', eventController.deleteEvent);

module.exports = router; 