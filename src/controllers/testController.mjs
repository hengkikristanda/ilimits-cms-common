import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(__dirname, "..", "..", "public");

export const convertImage = async (req, res) => {
	const fileName = "promotion-ndb.webp";
	const imagePath = path.join(publicFolderPath, "img", "promotions", fileName);

	try {
		// Read the image file as a buffer
		const imageBuffer = fs.readFileSync(imagePath);

		// Determine the MIME type based on the file extension
		const mimeType = getMimeType(path.extname(fileName));

		// Convert the buffer to a Blob with the determined MIME type
		const imageBlob = new Blob([imageBuffer], { type: mimeType });

		console.log(imageBlob);

		return imageBlob;
	} catch (error) {
		console.error("Error reading and converting image file:", error);
		throw error;
	}
};

function getMimeType(fileExtension) {
	switch (fileExtension.toLowerCase()) {
		case ".jpg":
		case ".jpeg":
			return "image/jpeg";
		case ".png":
			return "image/png";
		case ".gif":
			return "image/gif";
		case ".webp":
			return "image/webp";
		// Add more file extensions and MIME types as needed
		default:
			return "application/octet-stream"; // Default to binary data
	}
}
