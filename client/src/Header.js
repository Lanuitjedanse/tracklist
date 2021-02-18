import React from "react";
import Menu from "./Menu";
import LogoWhite from "./LogoWhite";
import ProfilePic from "./ProfilePic";
import HamburgerMenu from "./HamburgerMenu";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Header(props) {
    const [mQuery, setMQuery] = useState();

    // const [updateSize, setUpdateSize] = useState();
    // const [menuVisible, setMenuVisible] = useState(false);

    // console.log("props: ", props);
    // console.log("mql: ", mql);

    useEffect(() => {
        // componentDidMount - registers eventlistener, event fired by the browser
        window.addEventListener("resize", updateSize);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 900px)");
        setMQuery(mql.matches);
        // console.log(mql.matches); // true or false
    };
    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        console.log("burger open");
        setBurgerOpen(!burgerOpen);
    };

    let src;

    burgerOpen ? (src = "/x-btn.svg") : (src = "/hamburger-menu.svg");

    return (
        <>
            <header>
                <div className="logo-title">
                    <LogoWhite />
                    <h2 className="brand-header">Tracklist</h2>
                </div>
                <div className="log-pic-box">
                    {mQuery ? (
                        <img
                            onClick={toggleBurgerMenu}
                            className="icon-menu"
                            src={src}
                        />
                    ) : (
                        <Menu />
                    )}
                    <ProfilePic {...props} />
                </div>
            </header>
            {burgerOpen && (
                <HamburgerMenu toggleBurgerMenu={toggleBurgerMenu} />
            )}
        </>
    );
}

//  return (
//      <>
//          <header>
//              <div className="logo-title">
//                  <LogoWhite />
//                  <h2 className="brand-header">Tracklist</h2>
//              </div>
//              <div className="log-pic-box">
//                  {mQuery ? (
//                      <img
//                          onClick={toggleBurgerMenu}
//                          className="icon"
//                          src="/hamburger-menu.svg"
//                      />
//                  ) : (
//                      <Menu />
//                  )}
//                  <ProfilePic {...props} />
//              </div>
//          </header>
//          {burgerOpen && <HamburgerMenu />}
//          {burgerOpen && <HamburgerMenu />}
//      </>
//  );
