const express = require("express");
const flash = require("flash");
const { fileURLToPath } = require("url");
const { path, dirname, join } = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");

const apiRoutes = require("./src/routes/api");
const { port } = require("./src/config/config.js");

const app = express();

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: true,
	})
);

app.use(flash());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static(join(__dirname, "public")));

app.use("/routes", apiRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
