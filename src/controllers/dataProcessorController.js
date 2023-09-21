import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicFolderPath = path.join(__dirname, "..", "..", "public");

export const dataProcessor = (req, res, next) => {
	const { body } = req;

	let destinationURL = "public/promotions/index.html";

	if (!body || typeof body !== "object") {
		return res.status(400).json({ message: "Invalid data format", redirectURL: destinationURL });
	}

	req.session.content = body.content;

	destinationURL = "preview.html";

	res.json({ redirectURL: destinationURL });
};
