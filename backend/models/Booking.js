const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [120, 'Name is too long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: [40, 'Phone number is too long'],
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: {
      values: ['Concert', 'Church Service', 'Private Event', 'Corporate', 'Festival'],
      message: 'Unsupported event type',
    },
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location is too long'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [2000, 'Message is too long'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'declined'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', BookingSchema);
