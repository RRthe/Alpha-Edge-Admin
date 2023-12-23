const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService'); // import the whole service file

// Route to send emails based on a template type
router.post('/send-email', async (req, res) => {
  try {
    const templateType = req.body.templateType; // e.g., 'AccountBreachAlert', 'ForgotPassword', etc.
    const templateData = req.body.templateData; // The data needed to fill the template
    
    await emailService.sendEmailByTemplate(templateType, templateData);
    res.json({ message: `Email for ${templateType} sent successfully.` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to create a new email template
router.post('/create-template', async (req, res) => {
  try {
    const { name, subject, body } = req.body; // Extract template details from request body
    const newTemplate = await emailService.createTemplate({ name, subject, body });
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

  