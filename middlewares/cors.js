const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    "origin": "*",
    "methods": "GET,PUT,PATCH,POST,DELETE",
    code: 200,
  })
);

module.exports = app;
