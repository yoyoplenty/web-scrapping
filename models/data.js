const mongoose = require("mongoose"),
    dataSchema = new mongoose.Schema({});

module.exports = mongoose.model("Data", dataSchema);
