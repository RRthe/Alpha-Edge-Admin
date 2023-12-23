const nodemailer = require('nodemailer');
// Include your MongoDB client or model to fetch the template

// Configure your transporter
const transporter = nodemailer.createTransport({
  // ... transporter configuration (SMTP server or service details)
});

const sendEmail = async (template, user) => {
    // Replace placeholders in the template with user data
    const finalContent = template.text.map(line => {
        return line.replace('{fname}', user.firstName)
                   .replace('{uid}', user.userId)
                   .replace('{upass}', user.password)
                   .replace('{uacc}', user.accountNumber)
                   .replace('{mpass}', user.masterPassword)
                   .replace('{investorPassword}', user.investorPassword)
                   .replace('{baseurl}', user.dashboardUrl);
    }).join('\n');

    // Define the email options
    const mailOptions = {
        from: 'info@alphaedgecg.com', // Replace with your email address
        to: user.email,
        subject: template.description,
        text: finalContent,
        // Add any additional options needed for the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

// ... other functions

module.exports = {
    sendEmail,
    // ... export other functions as needed
};

