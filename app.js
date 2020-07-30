const path = require("path");
const express = require("express");
const cors = require("cors");
const compression = require("compression");

// routers
const userRouter = require("./routes/userRoutes");
const transactionRouter = require("./routes/transactionRoutes");

const app = express();

// Middleware

// Serving static files
app.use(express.static(path.join(__dirname, "view/build")));

// Implementing CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.options("*", cors());

// Body parser, reading data from body into req.body => Body larger than 10kb will not be accepted
app.use(express.json({ limit: "10kb" }));

// Compression of text sent to clients.
app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "view/build/index.html"));
});

// Handling Unhandled Routes
app.all("*", (req, res, next) => {
  return res
    .status(404)
    .json({ error: `Can\'t find ${req.originalUrl} on this server!` });
});

module.exports = app;
