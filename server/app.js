const express = require('express');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 2000;

// CORS Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, "../Client/Website")));

// Logger middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Register routes
const router = require("./router");
router(app);

require("./services")(app);  // MongoDB services

// Optional 404 fallback
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is connected at http://localhost:${PORT}`);
  console.log('server started at:', new Date().toLocaleString());
});