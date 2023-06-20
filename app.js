/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { convertTimezone } = require("./controllers/timezoneController");

app.post("/convert-timezone", convertTimezone);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
