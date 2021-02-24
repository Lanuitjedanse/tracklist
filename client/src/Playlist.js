// import { useState, useEffect } from "react";
// import axios from "./Axios";

export default function Playlist() {
    // const [playlist, setPlaylist] = useState("");
    // const [updateLink, setUpdateLink] = useState("");
    // // const [buttonText, setButtonText] = "send";
    // const [playlistVisible, setPlaylistVisible] = useState(false);

    // const handleChange = (e) => {
    //     console.log("e.target.value", e.target.value);
    //     // console.log("e.target.name: ", e.target.name);
    //     this.setState({
    //         [e.target.name]: e.target.value,
    //     });
    //     // console.log(this.state);
    //     // () => console.log("this.state after setstate: ", this.state);
    // };

    // const setAddLink = () => {
    //     console.log("useEffect is running!");
    //     // console.log("viewee: ", viewee);
    //     if (addLink) {
    //         axios
    //             .post("/playlist")
    //             .then(({ data }) => {
    //                 console.log("data : ", data);

    //                 console.log("data: ", data.button);
    //                 setPlaylist(data.playlist);

    //                 // if (data.button == "accept") {
    //                 //     props.updateFriendShipStatus(true);
    //                 // }
    //             })
    //             .catch((err) => {
    //                 console.log("err in axios get users: ", err);
    //             });
    //     }
    // }, [addLink]);

    return (
        <div className="playlist">
            <iframe
                src="https://open.spotify.com/embed/playlist/51siUNlGNdF4Bp78hKZ8RA"
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
        </div>
    );
}
