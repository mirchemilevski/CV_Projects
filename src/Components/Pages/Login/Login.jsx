import React, { useContext } from "react";

// npm imports
import styled from "styled-components";

//component imports
import { Heading16 } from "../../Text/Text";

// other imports
import { GlobalContext } from "../../../Context/GlobalContext";
import Button from "../../Button/Button";
import { navigate } from "@reach/router";
import { API } from "../../../Consts/Api";

const LoginWrapper = styled.div`
    position:fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    background-color: ${props => props.theme.dark_gray};
    
    input{
        border: 1px solid ${props => props.theme.them_gray};
        border-radius: 5px;
        padding: 8px 0px;
        margin: 15px 0px; 
    }

    input, button{
        width: 80%;
    }
`

const Login = () => {
    const { user, setUser } = useContext(GlobalContext)

    const login = () => {
        localStorage.setItem("user", JSON.stringify(user))
        navigate(API.paths.newsFeed)
    }

    return (
        <LoginWrapper>
            <Heading16>
                Choose you username
            </Heading16>
            <input
                type='text'
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
            />
            <Button
                type='button'
                text='Login'
                disabled={user.userName === ""}
                onClick={login}
            />
        </LoginWrapper>
    )
}

export default Login;