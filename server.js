/**
 * Projektarbete DT207G
 * Skapad av: Ramona Reinholdz, rare2400
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api", authRoutes);

//start application
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});