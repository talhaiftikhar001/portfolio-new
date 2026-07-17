const express = require('express');
const router = express.Router();
const { isMongoConnected, getFallbackData, saveFallbackData } = require('../config/db');
const mongoose = require('mongoose');

// Define models if mongoose is running
let StatModel;
let ContactModel;

const initModels = () => {
  if (isMongoConnected() && mongoose.connection.readyState === 1) {
    if (!StatModel) {
      const visitsSchema = new mongoose.Schema({
        key: { type: String, required: true, unique: true },
        value: { type: Number, default: 0 }
      });
      StatModel = mongoose.models.Stat || mongoose.model('Stat', visitsSchema);
    }
    if (!ContactModel) {
      const contactSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true },
        subject: { type: String },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      });
      ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
    }
  }
};

router.get('/', async (req, res) => {
  try {
    initModels();
    let visits = 0;
    let submissions = 0;

    if (isMongoConnected() && StatModel && ContactModel) {
      // Find and increment visits in MongoDB
      let visitRecord = await StatModel.findOne({ key: 'visits' });
      if (!visitRecord) {
        visitRecord = new StatModel({ key: 'visits', value: 142 }); // starting baseline
      }
      visitRecord.value += 1;
      await visitRecord.save();
      visits = visitRecord.value;

      // Count contact form submissions in MongoDB
      submissions = await ContactModel.countDocuments();
    } else {
      // Fallback local file mode
      const db = getFallbackData();
      if (!db.stats) {
        db.stats = { visits: 142, formSubmissions: 0 };
      }
      db.stats.visits = (db.stats.visits || 142) + 1;
      db.stats.formSubmissions = db.contacts ? db.contacts.length : 0;
      saveFallbackData(db);

      visits = db.stats.visits;
      submissions = db.stats.formSubmissions;
    }

    res.json({
      success: true,
      projects: 9,
      skills: 15,
      researchPapers: 2,
      certifications: 3,
      visits: visits,
      formSubmissions: submissions
    });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    // Return standard counts in case of total failure
    res.json({
      success: true,
      projects: 9,
      skills: 15,
      researchPapers: 2,
      certifications: 3,
      visits: 143,
      formSubmissions: 0
    });
  }
});

module.exports = router;
