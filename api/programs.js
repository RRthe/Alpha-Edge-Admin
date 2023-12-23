const express = require('express');
const router = express.Router();
const Program = require('../models/program');

// POST route to create a new program
router.post('/create', async (req, res) => {
  try {
    const programData = req.body; // Assuming the form data is sent in the request body
    const program = new Program(programData);
    await program.save();
    res.status(201).send(program);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
