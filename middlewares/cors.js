const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    "origin": ["https://yehonatan604.github.io", "*"],
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    code: 200,
  })
);

module.exports = app;
