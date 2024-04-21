import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editpost from './editPost/EditPost';
import { Link, useNavigate, useParams } from "react-router-dom";


const Edit = () => {

    const { postID } = useParams();
    useEffect(() => {
        viewPostId(postID);
    }, []);

    const [ispostId, setpostId] = useState([]);
    const viewPostId = async (ids) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/postId`, {
                ids: postID
            })
                .then(res => {
                    if (res.data.success === true) {
                        setpostId(res.data.listId);
                    }
                })
        } catch (error) { throw error; }
    }

    return (
        <>
            {ispostId.length > 0 ? <>
                <Editpost postList={ispostId} editPostID={postID} />
            </> : null}

        </>
    )
}
export default Edit