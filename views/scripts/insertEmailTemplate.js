require('dotenv').config();
const { MongoClient } = require('mongodb');

const templates = [
  {
    name: "AccountBreachAlert",
    subject: "Account breach alert - Alpha Edge CG",
    content: "HTML content for AccountBreachAlert with {{placeholders}}"
  },
  {
    name: "ConfidentialInformation",
    subject: "Confidential Information - Alpha Edge CG",
    content: "HTML content for ConfidentialInformation with {{placeholders}}"
  },
  {
    name: "ForgotPassword",
    subject: "Forgot Password - Alpha Edge CG",
    content: "HTML content for ForgotPassword with {{placeholders}}"
  },
  {
    name: "NewAdminRegistered",
    subject: "New Admin Registered - Alpha Edge CG",
    content: "HTML content for NewAdminRegistered with {{placeholders}}"
  },
  {
    name: "NewTradingAccount",
    subject: "New Trading Account - Alpha Edge CG",
    content: "HTML content for NewTradingAccount with {{placeholders}}"
  },
  {
    name: "PayoutRequest",
    subject: "Payout Request - Alpha Edge CG",
    content: "HTML content for PayoutRequest with {{placeholders}}"
  },
  {
    name: "TargetReachedAlert",
    subject: "Target Reached Alert - Alpha Edge CG",
    content: "HTML content for TargetReachedAlert with {{placeholders}}"
  }
];


async function insertTemplates() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('emailTemplates');

    const insertResult = await collection.insertMany(templates);
    console.log(`${insertResult.insertedCount} templates were inserted.`);
  } catch (err) {
    console.error('Failed to insert templates:', err.message);
  } finally {
    await client.close();
  }
}

insertTemplates();


