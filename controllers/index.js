const AppError = require("../utils/appError");

exports.indexPage = async (req, res, next) => {
    try {
        res.send("Welcome to my Application");
    } catch (error) {
        return next(new AppError(500, "failed", "server error"));
    }
};
