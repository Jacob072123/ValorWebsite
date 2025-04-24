const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../Client/Website")));

// Logger for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// HTML Page routes
const router = require("./router");
router(app);

// MongoDB services
require("./services")(app);

// API Routes
const moodRoutes = require("./routes/moodRoutes");
const journalRoutes = require("./routes/journalRoutes");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes"); 

// Connect API Routes
app.use("/api/mood", moodRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

// Optional 404 fallback
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is connected at http://localhost:${PORT}`);
  console.log('Server started at:', new Date().toLocaleString());
});