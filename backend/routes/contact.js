const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { isMongoConnected, getFallbackData, saveFallbackData } = require('../config/db');

// Declare Schema & Model for Contact
let ContactModel;
const initContactModel = () => {
  if (isMongoConnected() && mongoose.connection.readyState === 1 && !ContactModel) {
    const contactSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      subject: { type: String },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });
    ContactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
  }
};

router.post('/', async (req, res) => {
  try {
    initContactModel();
    const { name, email, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    let savedRecord = null;

    if (isMongoConnected() && ContactModel) {
      // Save to MongoDB
      const newContact = new ContactModel({ name, email, subject: subject || 'No Subject', message });
      savedRecord = await newContact.save();
    } else {
      // Save to local fallback DB
      const db = getFallbackData();
      if (!db.contacts) db.contacts = [];
      
      const newContact = {
        id: Date.now().toString(),
        name,
        email,
        subject: subject || 'No Subject',
        message,
        createdAt: new Date().toISOString()
      };
      
      db.contacts.push(newContact);
      if (!db.stats) db.stats = { visits: 142, formSubmissions: 0 };
      db.stats.formSubmissions = db.contacts.length;
      
      saveFallbackData(db);
      savedRecord = newContact;
    }

    console.log(`✉️ New Message Received from ${name} (${email}): ${message}`);

    // Send email using Nodemailer
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const targetEmail = process.env.RECEIVER_EMAIL || 'talhaiftikhar001@gmail.com';

    if (emailUser && emailPass) {
      // Create transporter (standard SMTP settings)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      });

      const mailOptions = {
        from: `"${name}" <${emailUser}>`,
        to: targetEmail,
        replyTo: email,
        subject: `Portfolio Contact: ${subject || 'General Inquiry'}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
        html: `
          <h3>New Portfolio Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #0f172a; color: #e2e8f0; padding: 15px; border-radius: 5px; border: 1px solid rgba(255,255,255,0.1);">${message}</p>
        `
      };

      // Send mail asynchronously
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('❌ Nodemailer Error sending mail:', error.message);
        } else {
          console.log('✅ Nodemailer Email sent successfully:', info.response);
        }
      });
    } else {
      console.warn('⚠️ EMAIL_USER/EMAIL_PASS not configured in .env. Skipping Nodemailer mail delivery.');
    }

    return res.status(201).json({
      success: true,
      message: 'Message saved successfully! Thank you for getting in touch.',
      data: savedRecord
    });

  } catch (err) {
    console.error('❌ Error handling contact form:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
