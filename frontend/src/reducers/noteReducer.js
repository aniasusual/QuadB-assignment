import {
    NEW_NOTE_REQUEST,
    NEW_NOTE_SUCCESS,
    NEW_NOTE_FAIL,

    ALL_NOTES_REQUEST,
    ALL_NOTES_SUCCESS,
    ALL_NOTES_FAIL,

    ONE_NOTE_REQUEST,
    ONE_NOTE_SUCCESS,
    ONE_NOTE_FAIL,

    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
    DELETE_NOTE_RESET,

    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAIL,

    CLEAR_ERRORS,
} from "../constants/noteConstants";

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    success: false,
    error: null,
    note: null,
};

export const newNoteReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(NEW_NOTE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(NEW_NOTE_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.note = action.payload.note;
        })
        .addCase(NEW_NOTE_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});

export const allNotesReducer = createReducer({ notes: [] }, (builder) => {
    builder
        .addCase(ALL_NOTES_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(ALL_NOTES_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.notes = action.payload;
        })
        .addCase(ALL_NOTES_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});

export const deleteNoteReducer = createReducer({}, (builder) => {
    builder
        .addCase(DELETE_NOTE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(DELETE_NOTE_SUCCESS, (state, action) => {
            state.loading = false;
            state.deleteSuccess = action.payload.success;
        })
        .addCase(DELETE_NOTE_FAIL, (state, action) => {
            state.loading = false;
            state.deleteError = action.payload;
        })
        .addCase(DELETE_NOTE_RESET, (state, action) => {
            state.loading = false;
            state.deleteSuccess = false;
        })
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.deleteError = null;
        });
});


export const oneNoteReducer = createReducer({}, (builder) => {
    builder
        .addCase(ONE_NOTE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(ONE_NOTE_SUCCESS, (state, action) => {
            state.loading = false;
            state.noteSuccess = true;
            state.note = action.payload;
        })
        .addCase(ONE_NOTE_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});

export const updateNoteReducer = createReducer({}, (builder) => {
    builder
        .addCase(UPDATE_NOTE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(UPDATE_NOTE_SUCCESS, (state, action) => {
            state.loading = false;
            state.updateSuccess = true;
            state.updatedNote = action.payload;
        })
        .addCase(UPDATE_NOTE_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        });
});


