const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

const EVENT_TYPES = ['Concert', 'Church Service', 'Private Event', 'Corporate', 'Festival'];

function pickBookingFields(body = {}) {
  return {
    name: body.name,
    email: body.email,
    phone: body.phone,
    eventType: body.eventType,
    eventDate: body.eventDate,
    location: body.location,
    message: body.message,
  };
}

// Create a booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(pickBookingFields(req.body));
    await booking.save();

    const created = booking.toObject();
    res.status(201).json({ success: true, booking: created });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const error = Object.values(err.errors)
        .map((e) => e.message)
        .join('. ');
      return res.status(400).json({ success: false, error });
    }
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all bookings (admin only)
router.get('/', async (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return res.status(503).json({
      success: false,
      error: 'Admin access is not configured. Set ADMIN_TOKEN on the server.',
    });
  }

  if (req.get('x-admin-token') !== adminToken) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a booking's status (admin only)
router.patch('/:id', async (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return res.status(503).json({
      success: false,
      error: 'Admin access is not configured. Set ADMIN_TOKEN on the server.',
    });
  }

  if (req.get('x-admin-token') !== adminToken) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { status } = req.body || {};
  if (!['pending', 'confirmed', 'declined'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
module.exports.EVENT_TYPES = EVENT_TYPES;
