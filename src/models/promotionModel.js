const mysql = require("mysql2/promise");
const { dbConfig } = require("../config/config.js");
const { generateTimestampBasedUUID } = require("../utils/uuid.js");

const pool = mysql.createPool(dbConfig);

const TABLE_NAME = "promotion";
const TABLE_ROWS =
	"id, title, contentStatusId, imageSource, content, buttonLabel, ctaLink, createdBy, createdDate, modifiedBy, modifiedDate";
const TABLE_ROWS_INSERT =
	"id, title, imageSource, imageData, content, contentStatusId, buttonLabel, ctaLink, createdDate, modifiedDate";

const VIEW_NAME = "promotion_view";
const VIEW_ROWS = "id, title, imageSource, imageData, contentStatus, className, modifiedDate";

// Model function to retrieve all promotions from the database
const getAllPromotions = async () => {
	const connection = await pool.getConnection();
	const [rows] = await connection.query(`SELECT ${VIEW_ROWS} FROM ${VIEW_NAME}`);
	connection.release();
	return rows;
};

const createPromotion = async (data) => {
	try {
		const connection = await pool.getConnection();

		const id = generateTimestampBasedUUID();
		const title = data.promotionTitle;

		const content = data.contentData;
		const ctaButton = data.ctaButton;
		const ctaButtonLink = data.ctaButtonLink;
		const contentStatus = data.contentStatus;
		const imageSource = data.imageSource;
		const imageData = data.imageData;

		const sql = `INSERT INTO ${TABLE_NAME} (${TABLE_ROWS_INSERT}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
		const values = [
			id,
			title,
			imageSource,
			imageData,
			content,
			contentStatus,
			ctaButton,
			ctaButtonLink,
		];

		const [rows, fields] = await connection.execute(sql, values);

		connection.release(); // Release the connection back to the pool

		return rows.insertId; // Return the ID of the inserted row
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllPromotions,
	createPromotion,
};
