const express = require("express");
const path = require("path");
const apiRoutes = require("./src/routes/api");

const { port } = require("./src/config/config.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use("/routes", apiRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
