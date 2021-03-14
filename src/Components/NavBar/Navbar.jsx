import React, { useState, useContext, useEffect } from "react";

//npm imports
import styled, { withTheme } from "styled-components";
import { Link, useLocation } from "@reach/router";

//context
import { GlobalContext } from '../../Context/GlobalContext';

//consts imports
import { API } from "../../Consts/Api";

//components import
import { Heading14, Heading16 } from "../Text/Text";

//styled component
const NavBarWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    background-color: ${props => props.theme.dark_gray2};
    border: 1px solid ${props => props.theme.text_gray}; 
    .logo{
        color: ${props => props.theme.yellow};
    }
    .mobile-menu{
        .navigation-links{
            width: 100%;
            height: 100vh;
            position:fixed;
            top: 0;
            right: ${props => props.mobileMenuActive ? "0%" : "-110%"};
            background-color: ${props => props.theme.dark_gray};
            transition: right 0.4s;
            overflow: hidden;
            display:flex;
            flex-direction: column;
            align-items: flex-end;
            h5{
                padding:${props => props.mobileMenuActive ? '8px 15px' : '15px 0'}
            }
        }
    }
    .burger-menu{
        display: flex;
        flex-direction: column;
        span{
            width: 26px;
            border: 1px solid white;
            margin 3px 0;
            border-radius: 2px;
        }
    }
    .burger-menu-x{
        width: 26px;
        height: 26px;
        margin 8px 15px 0 0;
        display: flex;
        position:relative;

        span{
            width:26px;
            border: 1px solid white;
            border-radius: 2px;
            position: absolute;
            top: 13px;
            left: 0px;
        }

        span:first-child{
            transform: rotate(45deg);
        }

        span:last-child{
            transform: rotate(315deg);
        }
    }
`

//component
const NavBar = (props) => {
    const { user } = useContext(GlobalContext);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [IsNavBarVisible, setIsNavBarVisible] = useState(true)
    const location = useLocation();

    useEffect(() => {
        props.except && setIsNavBarVisible(!props.except.some(expectRoute => {
            return location.pathname.indexOf(expectRoute) > -1
        }))
    }, [location.pathname])

    return (
        IsNavBarVisible &&
        <NavBarWrapper mobileMenuActive={mobileMenuActive} className='navBar'>
            <Link to={API.paths.homePage} className='navbar-logo'>
                <Heading14 yellow={props => props.theme.yellow} className='logo'>
                    The Network
                </Heading14>
            </Link>
            <div className='mobile-menu'>
                <ul className='navigation-links'>
                    <div className='burger-menu-x' onClick={() => setMobileMenuActive(false)}>
                        <span></span>
                        <span></span>
                    </div>
                    <li>
                        <Link to={API.paths.myProfile.replace('{USER_NAME}', user.userName.replace(" ", "").toLowerCase())} >
                            <Heading16>
                                My Profile
                            </Heading16>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className='burger-menu' onClick={() => setMobileMenuActive(true)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </NavBarWrapper>
    )
}

export default withTheme(NavBar);