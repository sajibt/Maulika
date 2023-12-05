const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Updated connectDB function
const connectDB = require("../database/connection");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Load config
dotenv.config({ path: path.join(__dirname, "../config/config.env") });

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.mongoURI,
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Body parser middleware should come after session middleware
app.use(express.json());

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
