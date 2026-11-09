const mongoose = require('mongoose');

// Serverless functions are frozen between requests, so keep the connection
// promise on the global object and reuse it instead of reconnecting per call.
const globalCache = global.__reality7Mongo || { conn: null, promise: null };
global.__reality7Mongo = globalCache;

async function connectDB(uri) {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    const mongoUri = uri || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not configured');
    }

    globalCache.promise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .then((instance) => instance);
  }

  try {
    globalCache.conn = await globalCache.promise;
  } catch (err) {
    // Allow a later request to retry a failed connection.
    globalCache.promise = null;
    throw err;
  }

  return globalCache.conn;
}

module.exports = { connectDB };
