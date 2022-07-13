const express = require("express"),
    logger = require("morgan"),
    app = express();

//Import routes
const index = require("./routes/index"),
    data = require("./routes/data");

//Middlewares
app.use(logger("dev"));
app.use(express.static("uploads"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Assign valid routes for the app
app.use(index);
app.use("/api/v1/data", data);

module.exports = app;
