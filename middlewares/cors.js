const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["192.168.1.178:3000", "http://localhost:3000", "*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: true,
    code: 200,
  })
);

module.exports = app;
