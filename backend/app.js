const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();

// In production the API lives on the same origin as the site, so CORS is not
// needed. CORS_ORIGIN allows a separately hosted frontend (comma separated).
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: '32kb' }));

// Health checks must not depend on the database being reachable.
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Reality 7 API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Reality 7 API' });
});

// Connect before any route touches the database.
async function requireDatabase(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(503).json({
      success: false,
      error: 'Booking service is temporarily unavailable. Please try again shortly.',
    });
  }
}

// Routes
app.use('/api/bookings', requireDatabase, require('./routes/bookings'));

// 404 for unknown API routes
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

module.exports = app;
