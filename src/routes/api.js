const express = require("express");

const promotionController = require("../controllers/promotionController.js");

const router = express.Router();

router.get("/promotions", promotionController.findAll);

module.exports = router;
