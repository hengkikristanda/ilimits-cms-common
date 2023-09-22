const path = require("path");
const promotionService = require("../services/promotionService.js");
const dataPreprocessor = require("../utils/dataPreprocessor.js");

const findAll = async (req, res) => {
	try {
		const promotions = await promotionService.getAllPromotions();
		res.json(promotions);
	} catch (error) {
		console.error("Error fetching promotions:", error);
		res.status(500).json({ error: "An error occurred while fetching promotions." });
	}
};

const insertData = (req, res) => {
	try {
		const { promotionTitle, ctaButton, ctaButtonLink, contentStatus } = req.body;

		const { contentData, imageSource } = dataPreprocessor.preprocessData(req.body);

		const promotionData = {
			promotionTitle,
			imageSource,
			contentData,
			ctaButton,
			ctaButtonLink,
			contentStatus,
		};
		const insertedId = promotionService.createPromotion(promotionData);
		res.redirect("/promotions/index.html");
	} catch (error) {
		console.error("Error creating promotion:", error);
		res.status(500).json({ error: "An error occurred while creating the promotion." });
	}
};

module.exports = { findAll, insertData };
