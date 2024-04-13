const notesModel = require("../models/notesModel");
const ErrorHandler = require('../utils/errorHandler');


exports.createNote = async (req, res, next) => {
    try {

        const { title, content, mediaLink, backgroundColor } = req.body;
        // Create a new note instance
        const newNote = new notesModel({
            user: req.user,
            title: title,
            content: content,
            mediaLink: mediaLink,
            backgroundColor: backgroundColor
        });

        // Save the note to the database
        const savedNote = await newNote.save();

        console.log('Note saved successfully:', savedNote);
        res.json({
            success: true,
            note: savedNote
        })
    } catch (error) {
        console.error('Error saving note:', error);

        return next(new ErrorHandler(`Note creation failed due to error: ${error}`, 500));
    }
}


exports.getAllnotes = async () => {
    try {

        const userNotes = await notesModel.find({ user: req.user });

        console.log('Notes retrieved successfully:', userNotes);
        res.json({
            success: true,
            notes: userNotes
        })
    } catch (error) {
        console.error('Error retrieving notes:', error);
        return next(new ErrorHandler(`Note retrieval failed due to error: ${error}`, 500));
    }
}