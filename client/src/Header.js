// import React from "react";
import ProfilePic from "./ProfilePic";
import LogoWhite from "./LogoWhite";
import Logout from "./Logout";
import { Link } from "react-router-dom";

export default function Header(props) {
    // console.log("props: ", props);
    return (
        <header>
            <div className="logo-title">
                <LogoWhite />
                <h2 className="brand-header">Tracklist</h2>
            </div>
            <div className="log-pic-box">
                <Link to="/find-users">
                    <img src="/magnifier-white.svg" />
                </Link>
                <Logout />
                <ProfilePic {...props} />
            </div>
        </header>
    );
}

{
    /* <div>
    <ProfilePic {...props} />
    <Logout />
</div>; */
}
