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
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search, setSearch] = useState(false);

    const [isSort, setIsSort] = useState(false); // State for sorting
    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, success, notes, error } = useSelector(state => state.allNotes);
    const { deleteSuccess, deleteError } = useSelector(state => state.deleteNote);

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handleSearchIconClick = () => {
        setIsSearchOpen(!isSearchOpen);
        setSearch(!search);
    };

    const deleteNoteHandler = (id, e) => {
        e.stopPropagation();
        dispatch(deleteNote(id));
    }

    const handleSubmitSearch = () => {
        // Filter notes based on the entered keyword
        const filteredNotes = notes.notes.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()));

        // Update the state with the filtered notes
        setFilteredNotes(filteredNotes);
    };

    const handleCloseEditNote = () => {
        setEditNoteOpen(false);
    };

    const handleNewNote = () => {
        window.scrollTo(0, 0);
        setNewNoteOpen(prevState => !prevState);
    }

    const handleEditNote = (id) => {
        window.scrollTo(0, 0);
        dispatch(getOneNote(id));
        setEditNoteOpen(prevState => !prevState);
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

    // Function to toggle sorting
    const handleSort = () => {
        setIsSort(!isSort);
    }

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
                <span id='search-info'>click on search icon to toggle between search and normal mode</span>
                <button onClick={handleSort} className="sort-button">Sort</button>
                <div id="all-notes">
                    {!search && notes.notes && notes.notes.length !== 0 ? (
                        // filteredNotes && filteredNotes.length !== 0 ? filteredNotes : notes.notes
                        notes.notes.slice()
                            .sort((a, b) => {
                                // Sorting logic based on created at date
                                if (isSort) {
                                    return new Date(a.createdAt) - new Date(b.createdAt);
                                } else {
                                    return new Date(b.createdAt) - new Date(a.createdAt);
                                }
                            })
                            .map((item, index) => (
                                <div id="post_list">
                                    <div id="comp_list" key={index} onClick={() => handleEditNote(item._id)}>
                                        <h2>{item.title}</h2>
                                        <span className="created-date">created on {new Date(item.createdAt).toLocaleString()}</span>
                                        <div id="post_description" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                    <button onClick={(e) => deleteNoteHandler(item._id, e)} id="btn"> Delete </button>
                                </div>
                            ))
                    ) : (
                        null
                        // <div id='empty-notes'>
                        //     {!search ? <p>No Notes found</p> : null}

                        // </div>
                    )}
                    {/* //////////////////////////////////////////////////////// */}
                    {search && filteredNotes && filteredNotes.length !== 0 ? (
                        // filteredNotes && filteredNotes.length !== 0 ? filteredNotes : notes.notes
                        filteredNotes.slice()
                            .sort((a, b) => {
                                // Sorting logic based on created at date
                                if (isSort) {
                                    return new Date(a.createdAt) - new Date(b.createdAt);
                                } else {
                                    return new Date(b.createdAt) - new Date(a.createdAt);
                                }
                            })
                            .map((item, index) => (
                                <div id="post_list">
                                    <div id="comp_list" key={index} onClick={() => handleEditNote(item._id)}>
                                        <h2>{item.title}</h2>
                                        <span className="created-date">created on {new Date(item.createdAt).toLocaleString()}</span>
                                        <div id="post_description" dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </div>
                                    <button onClick={(e) => deleteNoteHandler(item._id, e)} id="btn"> Delete </button>
                                </div>
                            ))
                    ) : (
                        <div id='empty-notes'>

                        </div>
                    )}

                </div>
                <div id="newNote">
                    {editNoteOpen ?
                        <div className="modal">
                            <EditNote />
                        </div>
                        : null}
                    {newNoteOpen ?
                        <div className="modal">
                            <AddNote />
                        </div>
                        : null}
                </div>
            </div>
            <div id="bottom">
                <div id="bottom-right">
                    {editNoteOpen ?
                        <div id="close-newNote" onClick={handleCloseEditNote}>
                            <RxCross1 size={40} />
                        </div> : null
                    }
                    {newNoteOpen ?
                        <div id="close-newNote" onClick={handleNewNote}>
                            <RxCross1 size={40} />
                        </div> :
                        <button onClick={handleNewNote} >+</button>
                    }
                    {/* Sorting button */}
                </div>
            </div>
        </div>
    )
}

export default Home;