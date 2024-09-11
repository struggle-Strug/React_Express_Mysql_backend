const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const passport = require("passport");

const routers = require("./routers");
const db = require("./Models");

//connect MySql
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Intialize Passport
app.use(passport.initialize());

app.use("/api/", routers);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});