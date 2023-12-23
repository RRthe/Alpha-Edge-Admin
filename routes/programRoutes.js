// Import necessary modules
const Program = require('../models/program');
const express = require('express');
const router = express.Router();

// ... (Other routes remain the same) ...

// POST a new program
router.post('/api/programs', async (req, res) => {
  try {
    const program = new Program(req.body);
    await program.save();
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT (update) program by ID
router.put('/api/programs/:id', async (req, res) => {
    // Implement your update logic here
    // Example: Find the program by ID and update it with req.body
});

module.exports = router;
