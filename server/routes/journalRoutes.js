const express = require("express");
const { ObjectId, MongoClient } = require("mongodb");

const router = express.Router();
const DB_NAME = "Valor";
const COLLECTION_NAME = "JournalEntries";
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

// Create and connect MongoDB client
const client = new MongoClient(MONGO_URL);
client.connect().then(() => console.log("Journal route connected to MongoDB"));

// Save a journal entry
router.post("/", async (req, res) => {
  const { user_id, entry_text } = req.body;

  if (!user_id || !entry_text || !ObjectId.isValid(user_id)) {
    return res.status(400).json({ msg: "Invalid or missing user_id or entry text" });
  }

  try {
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).insertOne({
      user_id: new ObjectId(user_id),
      entry_text,
      timestamp: new Date()
    });

    res.status(201).json({ message: "Journal entry saved", id: result.insertedId });
  } catch (err) {
    console.error("Error saving journal entry:", err);
    res.status(500).json({ msg: "Error saving journal entry" });
  }
});

// Delete a journal entry
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }

  try {
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Journal entry not found" });
    }
    res.status(200).json({ msg: "Journal entry deleted successfully" });
  } catch (err) {
    console.error("Journal DELETE error:", err);
    res.status(500).json({ msg: "Error deleting journal entry" });
  }
});

module.exports = router;