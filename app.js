const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
require("./db/Conn");
dotenv.config({ path: "./config.env" });

// SECURITY MIDDLEWARE
const cors = require("cors");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const expressMongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const ErrorHandler = require("./middleware/ErrorHandler");


//security middleware implement
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(xssClean());
app.use(expressMongoSanitize());
app.use(hpp());


app.use(ErrorHandler)
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: "The Server Error Here" });
  }
});



readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);

module.exports = app;
