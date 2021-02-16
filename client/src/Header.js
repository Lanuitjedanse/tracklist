// import React from "react";
import ProfilePic from "./ProfilePic";
import LogoWhite from "./LogoWhite";
import Logout from "./Logout";

export default function Header(props) {
    // console.log("props: ", props);
    return (
        <header>
            <div className="logo-title">
                <LogoWhite />
                <h2 className="brand-header">Tracklist</h2>
            </div>
            <div className="log-pic-box">
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
