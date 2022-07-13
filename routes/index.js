const router = require("express").Router(),
    indexController = require("../controllers/index");

router.get("/", indexController.indexPage);

module.exports = router;
