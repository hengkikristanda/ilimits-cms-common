const PromotionModel = require("../models/promotionModel.js");

// Service function to retrieve all promotions
const getAllPromotions = async () => {
	try {
		return await PromotionModel.getAllPromotions();
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching promotions");
	}
};

// Service function to create a new promotion
/*
const createPromotion = (promotionData) => {
	try {
		return PromotionModel.createPromotion(promotionData);
	} catch (error) {
		console.log(error);
		throw new Error("Error creating promotion");
	}
};
*/

module.exports = {
	getAllPromotions,
};
