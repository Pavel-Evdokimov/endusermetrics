const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/metrics", (req, res) => {
  let post = JSON.parse(req.body);
  res.json({});
});

app.post("/metrics/performance", (req, res) => {
  let post = JSON.parse(req.body);
  res.json({});
});

module.exports = app;