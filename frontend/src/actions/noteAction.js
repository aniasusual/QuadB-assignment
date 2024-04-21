import axios from "axios";
import {
    NEW_NOTE_REQUEST,
    NEW_NOTE_SUCCESS,
    NEW_NOTE_FAIL,

    ALL_NOTES_REQUEST,
    ALL_NOTES_SUCCESS,
    ALL_NOTES_FAIL,

    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,

    CLEAR_ERRORS,
    ONE_NOTE_REQUEST,
    ONE_NOTE_SUCCESS,
    ONE_NOTE_FAIL,
} from "../constants/noteConstants";


export const createNote = (title, description) => async (dispatch) => {
    try {
        // console.log("control reaches createNote");
        dispatch({ type: NEW_NOTE_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/create-note`, { title, description }, config);

        // console.log(data);

        dispatch({ type: NEW_NOTE_SUCCESS, payload: data });

    } catch (error) {
        console.log("error occured in createNote in noteAction: ", error);
        dispatch({ type: NEW_NOTE_FAIL, payload: error.response.data.message });

    }
}

export const getAllNotes = () => async (dispatch) => {

    try {
        // console.log("control reaches getAllNotes");
        dispatch({ type: ALL_NOTES_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/all-notes`, { withCredentials: true })

        dispatch({ type: ALL_NOTES_SUCCESS, payload: data });


    } catch (error) {
        console.log("error occured in getAllNotes in noteAction: ", error);
        dispatch({ type: ALL_NOTES_FAIL, payload: error.response.data.message });
    }


}

// Delete Product
export const deleteNote = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_NOTE_REQUEST });

        const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/note/delete/${id}`, { withCredentials: true });

        dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_NOTE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getOneNote = (id) => async (dispatch) => {
    try {
        dispatch({ type: ONE_NOTE_REQUEST });

        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/note/find`, { id: id }, { withCredentials: true });

        dispatch({
            type: ONE_NOTE_SUCCESS,
            payload: data.note,
        });
    } catch (error) {
        dispatch({
            type: ONE_NOTE_FAIL,
            payload: error.response.data.message,
        });
    }
}