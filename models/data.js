const mongoose = require("mongoose"),
    dataSchema = new mongoose.Schema({
        url: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        price: {
            type: String,
            require: true,
        },
        link: {
            type: String,
            require: true,
        },
        img_url: {
            type: String,
            require: true,
        },
    });

module.exports = mongoose.model("Data", dataSchema);
