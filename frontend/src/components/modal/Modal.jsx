import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Modal() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [noteTitle, setNoteTitle] = useState('');
    const [image, setImage] = useState(null);
    const [showAddNoteBox, setShowAddNoteBox] = useState(false);

    const handleAddNote = () => {
        setShowAddNoteBox(true);
    };

    const handleSaveNote = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);

        const newNote = {
            title: noteTitle,
            content: rawContentState,
            image: image,
            timestamp: Date.now()
        };

        // Save the note to the database (send to backend)
        saveNoteToDatabase(newNote);

        setShowAddNoteBox(false);
        setNoteTitle('');
        setEditorState(EditorState.createEmpty());
        setImage(null);
    };

    const handleCancelNote = () => {
        setShowAddNoteBox(false);
        setNoteTitle('');
        setEditorState(EditorState.createEmpty());
        setImage(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const saveNoteToDatabase = (note) => {
        // Here you can send the note data to your backend server to save it in the database
        // Example: fetch('/api/notes', { method: 'POST', body: JSON.stringify(note), headers: { 'Content-Type': 'Modallication/json' }})
        // Make sure to handle the response accordingly
    };

    useEffect(() => {
        handleAddNote();
    }, []);


    return (
        <div className="Modal">
            <header className="header">
                <h1>My Notes</h1>
            </header>
            {/* <button className="add-note-btn" onClick={handleAddNote}>Add Note</button> */}
            {showAddNoteBox && (
                <div className="add-note-box">
                    <input
                        type="text"
                        placeholder="Title"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <input type="file" onChange={handleImageUpload} />
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={(editorState) => setEditorState(editorState)}
                    />
                    <div>
                        <button onClick={handleSaveNote}>Save</button>
                        <button onClick={handleCancelNote}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
