import React from "react";

import "./Components/IconsLibrary/IconsLibrary";
//npm import
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Consts/GlobalStyle";
import { Router, LocationProvider } from "@reach/router";

//component import
import LayoutTest from "./Components/LayoutTest/LayoutTest";
import MyProfile from "./Components/Myprofile/Myprofile";
import NavBar from "./Components/NavBar/Navbar";
import Login from "./Components/Pages/Login/Login";
import NewsFeed from "./Components/Pages/NewsFeed/NewsFeed";

//consts imports
import theme from "./Consts/Theme";
import { API } from "./Consts/Api";

//context provider
import { GlobalContextProvider } from "./Context/GlobalContext";

// vaka se pristapuva env varijabla bilo kade vo aplikacijata
// console.log(process.env.REACT_APP_API_URL)
const App = () => (
  <GlobalContextProvider>
    <LocationProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar except={["/login"]} />
        <Router>
          <Login path={API.paths.login} />
          <LayoutTest path={API.paths.layout} />
          <MyProfile
            path={API.paths.myProfile.replace("{USER_NAME", ":userName")}
          />
          <NewsFeed path={API.paths.homePage} />
        </Router>
      </ThemeProvider>
    </LocationProvider>
  </GlobalContextProvider>
);

export default App;
