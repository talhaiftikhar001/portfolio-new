const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isConnected = false;
const fallbackDbPath = path.join(__dirname, '..', 'db_fallback.json');

// Initialize fallback JSON file if it doesn't exist
if (!fs.existsSync(fallbackDbPath)) {
  fs.writeFileSync(fallbackDbPath, JSON.stringify({ contacts: [], stats: { visits: 0, formSubmissions: 0 } }, null, 2));
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
    const data = fs.readFileSync(fallbackDbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading fallback DB:', err);
    return { contacts: [], stats: { visits: 0, formSubmissions: 0 } };
  }
};

const saveFallbackData = (data) => {
  try {
    fs.writeFileSync(fallbackDbPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing fallback DB:', err);
  }
};

module.exports = {
  connectDB,
  isMongoConnected: () => isConnected,
  getFallbackData,
  saveFallbackData
};
