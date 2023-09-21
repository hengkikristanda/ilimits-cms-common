import path from "path";
import fs from "fs";

import * as cheerio from "cheerio";

export function preprocessData({ content }) {
	const $ = cheerio.load(content, null, false);

	let thumbnailImage = "https://placehold.co/288x288?text=No+Image+Available";

	$('img[src^="data:image/"]').each((index, element) => {
		const dataUrl = $(element).attr("src");
		const imageFormat = extractImageFormat(dataUrl.split(",")[0]);
		const imageBuffer = Buffer.from(dataUrl.split(",")[1], "base64");
		// Generate a unique filename for the image
		const filename = `image_${Date.now()}_${index}.${imageFormat}`;
		// Define the path to save the image
		const imagePath = path.join("public/img/uploads", filename);
		// Save the image to the server
		fs.writeFileSync(imagePath, imageBuffer);
		// Replace the data URL with the path to the saved image
		$(element).attr("src", `/img/uploads/${filename}`);
		const imageBufferRead = fs.readFileSync(imagePath);
		const mimeType = "image/" + imageFormat;
		const imageBlob = new Blob([imageBuffer], { type: mimeType });

		if (index == 0) {
			thumbnailImage = filename;
		}
	});

	return {
		imageSource: thumbnailImage,
		contentData: $.html(),
	};
}

function extractImageFormat(dataUrl) {
	const formatRegex = /data:image\/(\w+);base64/;
	const match = dataUrl.match(formatRegex);
	if (match && match[1]) {
		return match[1];
	} else {
		return null;
	}
}

export { extractImageFormat };
