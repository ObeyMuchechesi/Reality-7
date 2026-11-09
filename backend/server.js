const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
