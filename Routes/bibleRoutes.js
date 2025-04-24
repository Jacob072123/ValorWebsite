const express = require("express");
const { BibleVerse } = require("../../models");

const router = express.Router();

// Save Bible Verse
router.post("/", async (req, res) => {
  const { user_id, verse_text, reference } = req.body;

  try {
    const newBibleVerse = new BibleVerse({ user_id, verse_text, reference });
    await newBibleVerse.save();

    res.status(201).json({ message: "Bible verse saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Bible Verses by User (most recent first)
router.get("/:user_id", async (req, res) => {
  try {
    const verses = await BibleVerse.find({ user_id: req.params.user_id }).sort({ timestamp: -1 });
    res.status(200).json({ verses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;