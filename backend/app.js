const express = require("express");
const errorMiddleware = require("./middleware/error");
const dataRouter = require("./routes/dataRoute");

const app = express();
app.use(express.json());

app.use("api/v1", dataRouter)

app.use(errorMiddleware);

module.exports = app;