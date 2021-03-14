import React, { createContext, useState, useEffect } from 'react';

//npm import
import { navigate } from "@reach/router";

//other imports
import { API } from "../Consts/Api";
import { useFetchMorePost } from "../Hooks/useFetchMorePost/useFetchMorePost";

export const GlobalContext = createContext({});

const { Provider } = GlobalContext;

export const GlobalContextProvider = props => {
    const [user, setUser] = useState({
        userName: "",
        token: ""
    });

    const [newsFeed, setNewsFeed] = useState([])
    const [feedOffset, setFeedOffset] = useState(0);
    const [lastPostId, setLastPostId] = useState();

    const { morePost, setMorePost, hasMorePost, setHasMorePost, waitForAxios, setWaitForAxios, loadPost } = useFetchMorePost(feedOffset)

    useEffect(() => {
        morePost && morePost.length > 0 && setNewsFeed([...newsFeed, ...morePost])
    }, [morePost])

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            let savedUser = JSON.parse(localStorage.getItem('user'))
            setUser({ ...user, userName: savedUser.userName })
        } else {
            navigate(API.paths.login)
        }
    }, [])

    useEffect(() => {
        if (newsFeed.length > 0) {
            let temporaryFeed = [...newsFeed];
            let lastPostId = temporaryFeed.pop().id;
            setLastPostId(lastPostId);
        }
    }, [newsFeed])

    const post = (user_name, text, setNewPost) => {
        let formData = new FormData();

        formData.append("user", user_name);
        formData.append("text", text);
        API.axios.post(API.routes.post, formData)
            .then(() => {
                setNewPost("");
                setNewsFeed([]);
                loadPost(0);
            })

            .catch((error) => {
                console.log(error)
            })
    }

    const globalState = {
        user,
        setUser,
        newsFeed,
        setNewsFeed,
        lastPostId,
        setLastPostId,
        waitForAxios,
        setWaitForAxios,
        setFeedOffset,
        hasMorePost,
        post,
    }

    return (
        <Provider value={globalState}>
            {props.children}
        </Provider>
    )
}