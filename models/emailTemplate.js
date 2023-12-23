const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  name: String,
  description: String,
  content: {
    id: String,
    style: String,
    textarea: {
      class: String,
      name: String,
      id: String,
      cols: Number,
      rows: Number,
      style: String,
      text: [String]
    }
  }
});

const EmailTemplate = mongoose.model('EmailTemplate', emailTemplateSchema);
