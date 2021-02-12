// import React from "react";
import ProfilePic from "./ProfilePic";
import LogoWhite from "./LogoWhite";

export default function Header(props) {
    console.log("props: ", props);
    return (
        <header>
            <div className="logo-title">
                <LogoWhite />
                <h2 className="brand-header">Tracklist</h2>
            </div>
            <ProfilePic {...props} />
        </header>
    );
}
