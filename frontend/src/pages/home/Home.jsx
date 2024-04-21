import React, { useEffect, useState } from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import "./home.scss"
import { BsSearch } from "react-icons/bs";
import Modal from '../../components/modal/Modal';
import AddNote from '../../components/addNote/AddNote';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, getOneNote } from '../../actions/noteAction';
import { Link } from 'react-router-dom';
import { useAlert } from "react-alert";
import { clearErrors } from '../../actions/userAction';
import { deleteNote } from '../../actions/noteAction';
import {
    DELETE_NOTE_RESET,

} from "../../constants/noteConstants";
import EditNote from '../../components/editNote/EditNote';



const Home = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [newNoteOpen, setNewNoteOpen] = useState(false);
    const [editNoteOpen, setEditNoteOpen] = useState(false);
    const [ispost, setpost] = useState([]);
    const alert = useAlert();


    const dispatch = useDispatch();

    const { loading, success, notes, error } = useSelector(state => state.allNotes);
    const { deleteSuccess, deleteError } = useSelector(state => state.deleteNote);



    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const handleSearchIconClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const deleteNoteHandler = (id, e) => {
        e.stopPropagation();
        dispatch(deleteNote(id));


    }

    const handleSubmitSearch = () => {

    }

    const handleNewNote = () => {
        window.scrollTo(0, 0)
        newNoteOpen ? setNewNoteOpen(false) : setNewNoteOpen(true);
        // console.log("handle new note fired")
    }

    const handleEditNote = (id) => {
        console.log("id from edit note", id);
        window.scrollTo(0, 0)
        dispatch(getOneNote(id));
        editNoteOpen ? setEditNoteOpen(false) : setEditNoteOpen(true);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (deleteSuccess) {
            alert.success("Note Deleted successfully");
            dispatch({ type: DELETE_NOTE_RESET });
        }


        dispatch(getAllNotes());

    }, [dispatch, alert, deleteError, deleteSuccess])



    return (
        <div id='homePage'>
            <div id="top">
                <Navbar />
            </div>
            <div id="mid">
                <h1>All Notes</h1>
                <div className="search-container">
                    <div className="search-icon" onClick={handleSearchIconClick}>
                        <BsSearch size={25}></BsSearch>
                    </div>

                    <div className={`search-bar ${isSearchOpen ? "open" : ""}`}>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                handleSubmitSearch();
                            }}
                        />
                        <button
                            type="submit"
                            onClick={handleSubmitSearch}
                            className="searchButton"
                        >
                            Search
                        </button>
                    </div>

                </div>
                <div id="all-notes">
                    {notes.notes && notes.notes.length !== 0 ? (
                        notes.notes.slice().reverse().map((item, index) => (
                            <div id="post_list">
                                {/* <Link to={`/edit/${item._id}`}> */}
                                <div id="comp_list" key={index} onClick={() => handleEditNote(item._id)}>
                                    <h2>{item.title}</h2>
                                    <span className="created-date">created on {new Date(item.createdAt).toLocaleString()}</span>
                                    <div id="post_description" dangerouslySetInnerHTML={{ __html: item.description }} />

                                </div>
                                {/* </Link> */}
                                <button onClick={(e) => deleteNoteHandler(item._id, e)} id="btn"> Delete </button>

                            </div>

                        ))
                    ) : (
                        <div id='empty-notes'>
                            No notes found.
                        </div>
                    )}
                </div>

                <div id="newNote">

                    {editNoteOpen ?
                        <div className="modal">
                            {/* <div id="close-newNote" onClick={handleNewNote}>
                                <RxCross1 size={50} />
                            </div> */}
                            <EditNote />



                        </div>
                        : null}

                    {newNoteOpen ?
                        <div className="modal">
                            {/* <div id="close-newNote" onClick={handleNewNote}>
                                <RxCross1 size={50} />
                            </div> */}
                            <AddNote />



                        </div>
                        : null}
                </div>

            </div>
            <div id="bottom">
                <div id="bottom-right">

                    {editNoteOpen ?
                        <div id="close-newNote" onClick={handleEditNote}>
                            <RxCross1 size={40} />
                        </div> : null
                    }

                    {newNoteOpen ?
                        <div id="close-newNote" onClick={handleNewNote}>
                            <RxCross1 size={40} />
                        </div> :
                        <button onClick={handleNewNote} >+</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home