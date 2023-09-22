const express = require("express");

const promotionController = require("../controllers/promotionController.js");

const router = express.Router();

router.get("/promotions", promotionController.findAll);
router.post("/promotions", promotionController.insertData);

module.exports = router;
