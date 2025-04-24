const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB setup
const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "Valor";

// Route to get all moods and journal entries for a user
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!ObjectId.isValid(user_id)) {
      return res.status(400).json({ msg: "Invalid user_id format" });
    }

    // Connect to the database
    await client.connect();
    const db = client.db(dbName);

    // Convert user_id to ObjectId
    const userObjectId = new ObjectId(user_id);

    // Fetch moods
    const moods = await db
      .collection("Moods")
      .find({ user_id: userObjectId })
      .sort({ timestamp: -1 })
      .toArray();

    // Fetch journal entries
    const journals = await db
      .collection("JournalEntries")
      .find({ user_id: userObjectId })
      .sort({ timestamp: -1 })
      .toArray();

    // Convert _id fields to strings for frontend compatibility
    const formattedMoods = moods.map(m => ({ ...m, _id: m._id.toString() }));
    const formattedJournals = journals.map(j => ({ ...j, _id: j._id.toString() }));

    res.status(200).json({
      moods: formattedMoods,
      journals: formattedJournals
    });

  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ msg: "Failed to fetch records." });
  }
});

module.exports = router;