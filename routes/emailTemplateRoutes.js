const express = require('express');
const router = express.Router();
const emailTemplateController = require('../controllers/emailTemplateController');

// Route to display all email templates
router.get('/', emailTemplateController.getAllEmailTemplates);

// Route to fetch and display a specific email template for editing
router.get('/email-templates/template-content/:templateId', (req, res) => {
    const templateId = req.params.templateId;
    res.render('email-templates/template' + templateId, {
        // You can pass dynamic data here if needed
    }, (err, html) => {
        if (err) {
            res.status(500).send('Error rendering template');
        } else {
            res.send(html);  // Send the rendered HTML back to the client
        }
    });
});
// Route to send a new account email after a purchase
router.post('/send-new-account-email', async (req, res) => {
    try {
        const userData = req.body; // Assume this contains all necessary user data
        await sendNewAccountEmail(userData);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

// Route to handle the creation of a new email template
router.post('/', emailTemplateController.createEmailTemplate);

// Route to handle the updating of an existing email template
router.post('/edit/:id', emailTemplateController.updateEmailTemplate);

// Route to handle the deletion of an email template
router.post('/delete/:id', emailTemplateController.deleteEmailTemplate);

module.exports = router;
