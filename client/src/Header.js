// import React from "react";
import ProfilePic from "./ProfilePic";
// import Logo from "./Logo";

export default function Header(props) {
    console.log("props: ", props);
    return (
        <header>
            <div className="logo-title">
                <img src="vinyl-white.svg" className="logo-header" />
                <h2 className="brand-header">Tracklist</h2>
            </div>
            <ProfilePic {...props} />
        </header>
    );
}
