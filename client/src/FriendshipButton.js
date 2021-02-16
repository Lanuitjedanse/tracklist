import { useState, useEffect } from "react";
import axios from "./Axios";

export default function FriendshipButton(props) {
    // const [viewer, setViewer] = useState("");
    // const [viewee, setViewee] = useState("");
    const [friendshipStatus, setFriendshipStatus] = useState("send");
    // const [buttonText, setButtonText] = "send";
    const [errorMessage, setErrorMessage] = useState(false);

    const buttonText = {
        send: "Make Friendship Request",
        accept: "Accept Friendship",
        cancel: "Cancel Friendship Request",
        end: "End Friendship",
    };

    // const [submit, setSubmit] = useState();

    useEffect(() => {
        console.log("useEffect is running!");
        // console.log("viewee: ", viewee);

        axios
            .get(`/check-friendship/${props.id}`)
            .then(({ data }) => {
                console.log("data.friend: ", data.friend);

                console.log("data: ", data.button);
                setFriendshipStatus(data.button);

                if (data.button == "accept") {
                    props.updateFriendShipStatus(true);
                }
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    }, []);

    const setSubmit = () => {
        // console.log("I am the set submit function");
        // console.log("props: ", props);
        axios
            .post(`/check-friendship/${friendshipStatus}`, {
                id: props.id,
            })
            .then(({ data }) => {
                // console.log("data: ", data);
                setFriendshipStatus(data.button);

                if (data.button == "accept") {
                    props.updateFriendShipStatus(true);
                }
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

    // useEffect(() => {
    //     console.log("useEffect is running!");
    //     axios
    //         .post(`/check-friendship/${viewee}`)
    //         .then(({ data }) => {
    //             // console.log("data: ", data);
    //             setFriendshipStatus(data.button);
    //         })
    //         .catch((err) => {
    //             console.log("err in axios get users: ", err);
    //         });
    // }, [submit]);

    // needs to get passed the id of the user that we are currently viewing
    // we will either want to be friend with that user, cancel a request we made in the past, accept a pending friend request or end our friendship
    // the id of the user lives in the OtherProfile commponent

    // in useEffect we want to make a request to the server to find out our relationship status with the user we're looking at
    // and send over some button text

    // on submit btn click we want to send the button text to the server, to update our db, and change the btn text again, once the DB has been successfully updated

    return (
        <>
            {friendshipStatus && (
                <button className="btn-purple" onClick={() => setSubmit()}>
                    {buttonText[friendshipStatus]}
                </button>
            )}
        </>
    );
}
