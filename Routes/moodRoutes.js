const express = require("express");
const { Mood } = require("../../models");

const router = express.Router();

// Log Mood
router.post("/", async (req, res) => {
  const { user_id, mood } = req.body;

  try {
    const newMood = new Mood({ user_id, mood });
    await newMood.save();

    res.status(201).json({ message: "Mood logged successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Moods by User ID (most recent first)
router.get("/:user_id", async (req, res) => {
  try {
    const moods = await Mood.find({ user_id: req.params.user_id }).sort({ timestamp: -1 });
    res.status(200).json({ moods });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;