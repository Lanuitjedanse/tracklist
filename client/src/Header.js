import React from "react";
import Menu from "./Menu";
import LogoWhite from "./LogoWhite";
import ProfilePic from "./ProfilePic";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Header(props) {
    let mql = window.matchMedia("(max-width: 600px)");
    const [updateSize, setUpdateSize] = useState();
    const [menuVisible, setMenuVisible] = useState(false);
    // console.log("props: ", props);
    console.log("mql: ", mql);

    useEffect(() => {
        console.log("use effect running");
    }, []);

    // const changeView = (menuVisible) => {
    //     menuVisible: true;
    // };

    return (
        <header>
            <div className="logo-title">
                <LogoWhite />
                <h2 className="brand-header">Tracklist</h2>
            </div>
            <div className="log-pic-box">
                {mql.matches ? (
                    <img
                        onClick={setMenuVisible}
                        className="icon"
                        src="/hamburger-menu.svg"
                    />
                ) : (
                    <Menu />
                )}
                <ProfilePic {...props} />
            </div>
        </header>
    );
}

// import ProfilePic from "./ProfilePic";
// import LogoWhite from "./LogoWhite";
// // import Logout from "./Logout";
// import { Link } from "react-router-dom";

// export default function Header(props) {
//     // console.log("props: ", props);
//     return (
//         <header>
//             <div className="logo-title">
//                 <LogoWhite />
//                 <h2 className="brand-header">Tracklist</h2>
//             </div>
//             <div className="log-pic-box">
//                 {mql.matches ? (
//                     <img
//                         onClick={setMenuVisible}
//                         className="icon"
//                         src="/hamburger-menu.svg"
//                     />
//                 ) : (
//                     <Menu />
//                 )}
//                 <ProfilePic {...props} />
//             </div>
//         </header>
//     );
// }
