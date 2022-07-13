const router = require("express").Router(),
    dataController = require("../controllers/data");

router.get("/", dataController.scrapData);

module.exports = router;
