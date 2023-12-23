// emailTemplateController.js

const EmailTemplate = require('../models/emailTemplate');

// Display all email templates
exports.getAllEmailTemplates = async (req, res) => {
    // ...
};

// Fetch an email template by its name
exports.getEmailTemplateByName = async (templateName) => {
    try {
        const template = await EmailTemplate.findOne({ name: templateName });
        return template; // This will return the template object to where the function was called
    } catch (error) {
        console.error('Error fetching email template by name:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};


// Create a new email template
exports.createEmailTemplate = async (req, res) => {
    // ...
};

// Update an existing email template
exports.updateEmailTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const template = await EmailTemplate.findByIdAndUpdate(templateId, req.body, { new: true });
        res.json(template);
    } catch (error) {
        res.status(500).json({ message: 'Error updating template' });
    }
};

// Delete an email template
exports.deleteEmailTemplate = async (req, res) => {
    // ...
};
