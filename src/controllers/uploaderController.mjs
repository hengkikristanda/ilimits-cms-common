import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(__dirname, "..", "..", "public");

export const imageUploader = (req, res, next) => {
	const storage = multer.diskStorage({
		destination: function (request, file, callback) {
			callback(null, "public/img/uploads/");
		},
		filename: function (request, file, callback) {
			const temp_file_arr = file.originalname.split(".");
			const temp_file_name = temp_file_arr[0];
			const temp_file_extension = temp_file_arr[1];

			console.log(`Original filename: ${file.originalname}`);
			console.log(`temp_file_arr: ${temp_file_arr}`);
			console.log(`temp_file_name: ${temp_file_name}`);
			console.log(`temp_file_extension: ${temp_file_extension}`);

			callback(null, temp_file_name + "-" + Date.now() + "." + temp_file_extension);
		},
	});

	const upload = multer({ storage: storage }).single("attachedImage");

	upload(req, res, function (error) {
		if (error) {
			console.log(error);
			res.status(500).json({ error: "Internal server error" });
		} else {
			const image = req.file;
			req.flash("success", req.file.filename);
			res.status(200).json({ message: "File uploaded successfully", filename: image.filename });
		}
	});
};

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
