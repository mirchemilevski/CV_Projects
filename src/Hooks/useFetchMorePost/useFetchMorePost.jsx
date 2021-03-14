import React, { useState, useEffect } from "react";

//npm imports
import styled from 'styled-components';

//other import
import { API } from "../../Consts/Api";

export const useFetchMorePost = (offset) => {
    const [morePost, setMorePost] = useState([]);
    const [hasMorePost, setHasMorePost] = useState(true);
    const [waitForAxios, setWaitForAxios] = useState(false);

    useEffect(() => {
        loadPost(offset)
    }, [offset])

    const loadPost = (offset) => {
        if (hasMorePost) {
            API.axios.get(API.routes.offset + offset)
                .then(response => {
                    waitForAxios && setWaitForAxios(false)
                    if (response.data.status === true) {
                        setMorePost(response.data.data)
                    } else {
                        setHasMorePost(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return { morePost, setMorePost, hasMorePost, setHasMorePost, waitForAxios, setWaitForAxios, loadPost }
}
