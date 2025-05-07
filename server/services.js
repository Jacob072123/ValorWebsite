const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

 const JWT_SECRET = "your_secret_key";
 const DB_NAME = "Valor"; 
 const COLLECTION_NAME = "Users";
 const MONGO_URL= process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

 // connect to mongo
  const client = new MongoClient(MONGO_URL);
  client.connect().then(() => console.log("mongoDB connected"));

  // middleware

  function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(403).json({error: "Token required"});
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if(err) return res.status(403).json({error: "Invalid token"});
      req.user = user;
      next();
    });
  }

    // routes 
    module.exports = function (app) {

    // Create user 
    
    app.post("/api/users", async (req, res) => {
      const { fullname, username, email, password } = req.body;
    
      try {
        const db = client.db(DB_NAME);
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await db.collection(COLLECTION_NAME).insertOne({
          fullname,
          username,
          email,
          password_hash: hashedPassword,
          created_at: new Date(),
        });
   
        res.status(201).json({
          message: "User created",
          id: result.insertedId,
          username: username
        });
      
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
      }
    });

  // log in 
  app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const db = client.db(DB_NAME);
      const user = await db.collection(COLLECTION_NAME).findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });
  
      const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          username: user.username
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed try again" });
    }
  });
  
  // Read users 
  app.get("/api/users", async (req, res) => {
    try {
      const db = client.db(DB_NAME);
      const users = await db.collection(COLLECTION_NAME).find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error finding users" });
    }
  });
};
