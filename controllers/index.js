const AppError = require("../utils/appError");

exports.indexPage = async (req, res, next) => {
    try {
        res.render("index");
    } catch (error) {
        return next(new AppError(500, "failed", "server error"));
    }
};
