import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import axios from 'axios';
import "./editNote.scss"
import { createNote } from '../../actions/noteAction';
import { useAlert } from 'react-alert';
import { clearErrors } from '../../actions/userAction';



function EditNote() {
    // let history = useHistory();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()


    const { success, error } = useSelector(state => state.newNote);
    const { noteSuccess, note } = useSelector(state => state.oneNote);

    const [userInfo, setuserInfo] = useState({
        title: note ? note.title : '',
    });

    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }

    const [isError, setError] = useState(null);
    const addDetails = async (event) => {
        try {
            event.preventDefault();
            event.persist();
            if (userInfo.description.value.length < 20) {
                setError('Required, Add description minimum length 20 characters');
                return;
            }
            // axios.post(`${process.env.REACT_APP_BACKEND_URL}/addNote`, {
            //     title: userInfo.title,
            //     description: userInfo.description.value
            // })
            //     .then(res => {
            //         if (res.data.success === true) {
            //             // history.push('/');
            //             navigate('/')
            //         }
            //     })
            dispatch(createNote(userInfo.title, userInfo.description.value));


        } catch (error) { throw error; }
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (noteSuccess) {
            console.log("useEffect", noteSuccess);
            console.log(userInfo.title)
            alert.success("Note Updated successfully")
            // window.location.reload();
        }

        setuserInfo(prevState => ({
            ...prevState,
            title: note ? note.title : '',
        }));

    }, [noteSuccess, navigate, alert, note])


    return (
        <>
            <div className="addnote">

                <form onSubmit={addDetails}>

                    <div>
                        <div id='note-title'>
                            <label > Title </label>
                            <input type="text" name="title" value={userInfo.title} onChange={onChangeValue} placeholder="Title" required />
                        </div>
                        <div id='note-description'>
                            <label> Description </label>
                            <Editor
                                editorState={description}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange}
                            />
                            <textarea style={{ display: 'none' }} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent()))} />

                        </div>
                        {isError !== null && <div className="errors"> {isError} </div>}
                        <div >
                            <button type="submit"> Submit  </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditNote