const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "Valor";

// Log a new mood
router.post("/", async (req, res) => {
  const { user_id, mood } = req.body;

  if (!user_id || !mood || !ObjectId.isValid(user_id)) {
    return res.status(400).json({ msg: "Invalid or missing user_id or mood" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection("Moods").insertOne({
      user_id: new ObjectId(user_id),
      mood,
      timestamp: new Date()
    });

    res.status(201).json({ msg: "Mood logged successfully" });
  } catch (err) {
    console.error("Mood POST error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a mood
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }

  try {
    const db = client.db(dbName);
    const result = await db.collection("Moods").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Mood not found" });
    }
    res.status(200).json({ msg: "Mood deleted successfully" });
  } catch (err) {
    console.error("Mood DELETE error:", err);
    res.status(500).json({ msg: "Error deleting mood" });
  }
});

module.exports = router;