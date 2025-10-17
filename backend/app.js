require("dotenv").config()

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();


// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB conection
require("./config/db.js");



// router
const router = require("./routes/router");
app.use(router);






app.listen(port, () => {
    console.log(`aplicação rodando na porta: ${port}`);
});