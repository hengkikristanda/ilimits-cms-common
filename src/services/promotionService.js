const PromotionModel = require("../models/promotionModel.js");
const fs = require("fs");

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

const createPromotion = (promotionData) => {
	try {
		const { imageSource } = promotionData;

		const imageFilePath = "./public/img/uploads/" + imageSource;

		// Read the image file and convert it to a Blob
		const imageBlob = readImageFile(imageFilePath);

		promotionData.imageData = imageBlob;

		return PromotionModel.createPromotion(promotionData);
	} catch (error) {
		console.log(error);
		throw new Error("Error creating promotion");
	}
};

function readImageFile(filePath) {
	try {
		// Read the image file
		const imageBuffer = fs.readFileSync(filePath);

		// Convert the image buffer to a Blob
		const imageBlob = Buffer.from(imageBuffer);

		return imageBlob;
	} catch (error) {
		console.error("Error reading image file:", error);
		throw error;
	}
}

module.exports = {
	getAllPromotions,
	createPromotion,
};
