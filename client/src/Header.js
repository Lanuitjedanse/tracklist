import React from "react";
import Menu from "./Menu";
import LogoWhite from "./LogoWhite";
import ProfilePic from "./ProfilePic";
import HamburgerMenu from "./HamburgerMenu";
import { useState, useEffect } from "react";
import Playlist from "./Playlist";

export default function Header(props) {
    const [mQuery, setMQuery] = useState();
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        setScreenSize(window.innerWidth);
        // console.log("window.width: ", window.innerWidth);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 900px)");
        setMQuery(mql.matches);

        // console.log(mql.matches); // true or false
    };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerOpen(!burgerOpen);
    };

    const [playlistOpen, setPlaylistOpen] = useState(false);

    const togglePlaylist = () => {
        setPlaylistOpen(!playlistOpen);
    };

    let src;

    burgerOpen ? (src = "/x-btn.svg") : (src = "/hamburger-menu.svg");

    return (
        <>
            <header>
                <div className="logo-title">
                    <LogoWhite togglePlaylist={togglePlaylist} />
                    <h2 className="brand-header">Tracklist</h2>
                </div>
                <div className="log-pic-box">
                    {screenSize < 900 || mQuery ? (
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

            {playlistOpen && <Playlist togglePlaylist={togglePlaylist} />}
        </>
    );
}
