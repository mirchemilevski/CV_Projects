import React, { useContext, useRef, useCallback } from "react";

// npm imports
import styled from 'styled-components';

//component imports
import NewPost from "../../NewPost/NewPost";
import Post from "../../Post/Post";
import SkeletonFeed from "../../Skeleton/SkeletonFeed";

//other imports
import { GlobalContext } from "../../../Context/GlobalContext";
import { Text24 } from "../../Text/Text";

const NewsFeedWrapper = styled.div`
    width: 100%;
    .no-more-posts-container{
        text-align: center;
    }
`

const NewsFeed = () => {
    const { newsFeed, setFeedOffset, lastPostId, hasMorePost, waitForAxios, setWaitForAxios } = useContext(GlobalContext)
    const observer = useRef();
    const lastPostRef = useCallback((node) => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMorePost && !waitForAxios) {
                setWaitForAxios(true);
                setFeedOffset(newsFeed.length);
            }
        })

        if (node) {
            observer.current.observe(node)
        }
    })

    return (
        <NewsFeedWrapper>
            <NewPost />
            {newsFeed && newsFeed.length > 0
                && newsFeed.map((post, index) => {
                    if (lastPostId === post.id) {
                        return (
                            <div key={index} ref={lastPostRef}>
                                <Post key={index} userName={post.user} textContent={post.text} />
                            </div>
                        )
                    } else {
                        return (
                            <Post key={index} userName={post.user} textContent={post.text} />
                        )
                    }
                })
            }
            {hasMorePost
                ? <SkeletonFeed />
                : <div className='no-more-posts-container'>
                    <Text24>NO MORE POSTS</Text24>
                </div>
            }
        </NewsFeedWrapper>
    )
}

export default NewsFeed;