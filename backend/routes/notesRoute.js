const express = require("express");
const notesRouter = express.Router();

const { isAuthenticated } = require("../middleware/auth")
const { createNote, getAllnotes } = require("../controllers/notesController")

notesRouter.route("/create-note").post(isAuthenticated, createNote)
notesRouter.route("/all-notes").get(isAuthenticated, getAllnotes)

module.exports = notesRouter;