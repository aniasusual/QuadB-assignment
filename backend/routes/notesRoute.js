const express = require("express");
const notesRouter = express.Router();

const { isAuthenticated } = require("../middleware/auth")
const { createNote, getAllnotes, deleteNote, updateNote, findNote } = require("../controllers/notesController")

notesRouter.route("/create-note").post(isAuthenticated, createNote)
notesRouter.route("/all-notes").get(isAuthenticated, getAllnotes)
notesRouter.route("/note/delete/:id").delete(isAuthenticated, deleteNote);
notesRouter.route("/note/update").post(isAuthenticated, updateNote);
notesRouter.route("/note/find").post(isAuthenticated, findNote);

module.exports = notesRouter;