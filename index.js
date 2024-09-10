const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const passport = require("passport");

const app = express();
app.use(cors("*"));
app.use(express.json());

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});