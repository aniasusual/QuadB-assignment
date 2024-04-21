import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/userReducer";
import { allNotesReducer, deleteNoteReducer, newNoteReducer, oneNoteReducer } from "./reducers/noteReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        newNote: newNoteReducer,
        allNotes: allNotesReducer,
        deleteNote: deleteNoteReducer,
        oneNote: oneNoteReducer
    },
})

export default store;