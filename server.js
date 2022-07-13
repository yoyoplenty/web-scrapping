const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
    path: "./config.env",
});

let database = "";

switch (process.env.NODE_ENV) {
    case "production":
        database = process.env.DATABASE;
        break;
    case "staging":
        database = process.env.STAGING_URI;
        break;
    case "qa":
        database = process.env.QA_MONGODB_URI;
        break;
    case "development":
        database = process.env.MONGODB_URI;
        break;
    case "local":
        database = process.env.DATABASEE;
        break;
    default:
        database = process.env.MONGODB_URI;
}

//Connect your mongoose
mongoose
    .connect(database)
    .then(() => {
        console.log("DB connection Successful!");
    })
    .catch((err) => {
        console.log("DB connection failed!");
    });

// Start the server
const port = process.env.PORT || 4006;

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION!!!  shutting down ...");
    console.log(err.name, err.message);
});
