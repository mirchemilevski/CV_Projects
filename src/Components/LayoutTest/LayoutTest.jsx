import React from 'react';

//npm imports
import styled from 'styled-components';

//component imports
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import SkeletonFeed from "../Skeleton/SkeletonFeed";


//other import
import Wrapper from '../Wrapper/Wrapper';

//styled-components
const LayoutTestWrapper = styled(Wrapper)`
    width: 100%;
`

//component
const LayoutTest = () => {
    return (
        <LayoutTestWrapper>
            <NewPost />
            <Post userName={'Jeff'} textContent={'Hi hahahahaha'} />
            <SkeletonFeed />
        </LayoutTestWrapper>
    );
}

export default LayoutTest;