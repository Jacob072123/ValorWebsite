const express = require("express");
const { Journal } = require("../../models");

const router = express.Router();

// Create Journal Entry
router.post("/", async (req, res) => {
  const { user_id, entry_text } = req.body;

  try {
    const newJournal = new Journal({ user_id, entry_text });
    await newJournal.save();

    res.status(201).json({ message: "Journal entry saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Journals by User
router.get("/:user_id", async (req, res) => {
  try {
    const journals = await Journal.find({ user_id: req.params.user_id }).sort({ timestamp: -1 });
    res.status(200).json({ journals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;