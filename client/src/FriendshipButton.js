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

    useEffect(() => {
        axios
            .get(`/check-friendship/${props.id}`)
            .then(({ data }) => {
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
        axios
            .post(`/check-friendship/${friendshipStatus}`, {
                id: props.id,
            })
            .then(({ data }) => {
                setFriendshipStatus(data.button);

                if (data.button == "accept") {
                    props.updateFriendShipStatus(true);
                }
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

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
