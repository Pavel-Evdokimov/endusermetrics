const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'));

module.exports = app;