const path = require("path");

module.exports = function (app) {
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/MainPage.html"));
  });

  // login page
  app.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/login.html"));
  });

  // register page
  app.get("/register", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/register.html"));
  });

  // mood page
  app.get("/log-mood", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/log-mood.html"));
  });

  // journal page
  app.get("/write-journal", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../Client/Website/write-journal.html"));
  });
};