const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");

const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("../database/connection");
// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Load config
dotenv.config({ path: path.join(__dirname, "../config/config.env") });

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

const corsOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
require("../config/passport-setup")(passport);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Initialize Passport and set up express-session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.mongoURI }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Development-only Middleware
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");

  app.use(
    morgan(
      '{ "METHOD": ":method", "url": ":url", "statusCode": ":status", "responseTime": ":response-time" }',
    ),
  );
}

// Routes
// app.get("/api", (req, res) => {
//   res.send("143669");
// });
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 4000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
