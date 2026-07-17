const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;
const fallbackDbPath = path.join(__dirname, '..', 'db_fallback.json');

// In-memory fallback database structure
let inMemoryDb = { contacts: [], stats: { visits: 142, formSubmissions: 0 } };

// Initialize fallback JSON file if possible (local environment)
try {
  if (fs.existsSync(fallbackDbPath)) {
    const fileContent = fs.readFileSync(fallbackDbPath, 'utf8');
    inMemoryDb = JSON.parse(fileContent);
  } else {
    fs.writeFileSync(fallbackDbPath, JSON.stringify(inMemoryDb, null, 2));
  }
} catch (err) {
  console.warn('⚠️ Running in Read-Only environment (Vercel). Local file writing disabled; fallback database active in-memory.');
}

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.warn('⚠️ MONGO_URI not found in env. Running backend in LOCAL JSON FALLBACK MODE.');
    return false;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully.');
    isConnected = true;
    return true;
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`);
    console.warn('⚠️ Running backend in LOCAL JSON FALLBACK MODE.');
    return false;
  }
};

const getFallbackData = () => {
  try {
    if (fs.existsSync(fallbackDbPath)) {
      const fileContent = fs.readFileSync(fallbackDbPath, 'utf8');
      inMemoryDb = JSON.parse(fileContent);
    }
  } catch (err) {
    // Gracefully use currently loaded inMemoryDb if read fails
  }
  return inMemoryDb;
};

const saveFallbackData = (data) => {
  inMemoryDb = data;
  try {
    fs.writeFileSync(fallbackDbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    // Silently ignore filesystem write failures (Read-Only/Vercel Serverless environment)
  }
};

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected,
  getFallbackData,
  saveFallbackData
};
