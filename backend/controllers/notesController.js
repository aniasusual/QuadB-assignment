const notesModel = require("../models/notesModel");
const ErrorHandler = require('../utils/errorHandler');


exports.createNote = async (req, res, next) => {
    try {

        const { title, description } = req.body;
        // Create a new note instance
        const newNote = new notesModel({
            user: req.user,
            title: title,
            description: description,
            // mediaLink: mediaLink,
            // backgroundColor: backgroundColor
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


exports.getAllnotes = async (req, res, next) => {
    try {

        const userNotes = await notesModel.find({ user: req.user });

        // console.log('Notes retrieved successfully:', userNotes);
        res.json({
            success: true,
            notes: userNotes
        })
    } catch (error) {
        console.error('Error retrieving notes:', error);
        return next(new ErrorHandler(`Note retrieval failed due to error: ${error}`, 500));
    }
}

exports.deleteNote = async (req, res, next) => {
    try {
        const note = await notesModel.findById(req.params.id);

        if (!note) {
            return next(new ErrorHandler("Product not found", 404));
        }


        // Use deleteOne method to delete the product document
        await notesModel.deleteOne({ _id: req.params.id });

        res.status(200).json({
            success: true,
            message: "Note Deleted Successfully",
        });

    } catch (error) {
        return next(new ErrorHandler("Product not deleted", 404));
    }
};

exports.updateNote = async (req, res) => {
    try {
        console.log("controller reaches postid")
        const postId = req.body.ids; // Assuming req.body.ids contains the post ID

        // Find the post by ID
        const post = await notesModel.findOne({ _id: postId });

        if (post) {
            return res.json({ success: true, listId: [post] });
        } else {
            return res.json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

exports.findNote = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);

        // Find the note by ID
        const note = await notesModel.findById(id);

        if (note) {
            res.status(200).json({ success: true, note: note });
        } else {
            res.status(404).json({ success: false, message: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}