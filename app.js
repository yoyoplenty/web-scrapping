const express = require("express"),
    logger = require("morgan"),
    path = require("path"),
    app = express(),
    flash = require("connect-flash"),
    session = require("express-session"),
    dotenv = require("dotenv");

//Configure dotenv
dotenv.config({
    path: "./config.env",
});

//View Set Up
const Handlebars = require("handlebars"),
    exphbs = require("express-handlebars"),
    { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access"),
    hbs = exphbs.create({
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    });

//Import routes
const index = require("./routes/index"),
    data = require("./routes/data");

//View Engine Set Up
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Initialize session and Flash for error message
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());
//Global variables
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.err = req.flash("err");
    next();
});

// Assign valid routes for the app
app.use(index);
app.use("/scrap", data);

module.exports = app;
