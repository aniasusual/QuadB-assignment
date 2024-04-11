const express = require("express");
const { getAllData } = require("../controllers/dataController");

const dataRouter = express.Router();

dataRouter.route("/data").get(getAllData);

module.exports = dataRouter;