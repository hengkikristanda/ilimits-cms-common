const promotionService = require("../services/promotionService.js");
const path = require("path");

const findAll = async (req, res) => {
	try {
		const promotions = await promotionService.getAllPromotions();
		res.json(promotions);
	} catch (error) {
		console.error("Error fetching promotions:", error);
		res.status(500).json({ error: "An error occurred while fetching promotions." });
	}
};

module.exports = { findAll };
