const path = require("path");

module.exports = function (app) {
  
  // Homepage
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/MainPage.html"));
  });

  // Login page
  app.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/login.html"));
  });

  // Register page
  app.get("/register", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/register.html"));
  });

  // Welcome page
  app.get("/welcome", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/welcome.html"));
  });

  // Mood logging page
  app.get("/log-mood", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/log-mood.html"));
  });

  // Journal writing page
  app.get("/write-journal", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/write-journal.html"));
  });

  // View journal or mood
  app.get("/view-records", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/view-records.html"));
  });
};
