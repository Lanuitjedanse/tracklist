import axios from "axios";
// import { Component } from "react";
import { Link } from "react-router-dom";
import FriendshipButton from "./FriendshipButton";
// import Playlist from "./Playlist";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function OtherProfile(props) {
    //  const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState(false);
    const [friendship, setFriendship] = useState("");
    const [otherFriends, setOtherFriends] = useState("");
    const [userMe, setUserMe] = useState("");
    // const [sender, setSender] = useState("");
    // const [recipient, setRecipient] = useState("");
    // const [cookieId, setCookieId] = useState("");

    // const friends = useSelector(
    //     (state) =>
    //         state.users && state.users.filter((friend) => friend.accepted)
    // );

    useEffect(() => {
        axios
            .get(`/show-users/${props.match.params.id}`)
            .then((response) => {
                if (props.match.params.id == response.data.cookie) {
                    return props.history.push("/");
                } else {
                    setId(response.data.rows.id);
                    setFirstName(response.data.rows.first);
                    setLastName(response.data.rows.last);
                    setProfilePicUrl(response.data.rows.profile_pic_url);
                    setBio(response.data.rows.bio);
                    setError(false);
                }
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });

        axios
            .get(`/friends-of-others/${props.match.params.id}`)
            .then((response) => {
                const userId = response.data.userId;

                let notMe = response.data.rows.filter(
                    (friend) =>
                        friend.recipient_id != userId &&
                        friend.sender_id != userId
                );

                let me = response.data.rows.find(
                    (friend) =>
                        friend.recipient_id == userId ||
                        friend.sender_id == userId
                );

                setUserMe(me);
                setOtherFriends(notMe);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    }, []);

    const updateFriendShipStatus = (friendship) => {
        setFriendship(friendship);
    };

    return (
        <div className="profile-container">
            {id && (
                <div className="profile-box">
                    <div className="profile-btn-img">
                        <img
                            className="profile-pic"
                            src={profilePicUrl || "/avatar.jpg"}
                            alt={`${firstName} ${lastName}`}
                        />
                        <h3>
                            {firstName} {lastName}
                        </h3>

                        <p className="bio-text">{bio}</p>
                        <FriendshipButton
                            id={id}
                            updateFriendShipStatus={(e) => {
                                updateFriendShipStatus(e);
                            }}
                        />
                    </div>

                    {userMe && (
                        <div className="us-box">
                            <div className="us-pic">
                                <img src={profilePicUrl || "/avatar.jpg"} />
                                <img
                                    src={
                                        userMe.profile_pic_url || "/avatar.jpg"
                                    }
                                />
                            </div>
                            <p>{firstName} and I are friends</p>
                        </div>
                    )}

                    {otherFriends && otherFriends.length != 0 && (
                        <div className="friends-others">
                            <h4 className="title-friends">
                                {firstName}'s friends
                            </h4>
                            <div className="other-friends-box">
                                {otherFriends &&
                                    otherFriends.map((other) => (
                                        <div
                                            className="other-friend"
                                            key={other.id}
                                        >
                                            <Link to={`/user/${other.id}`}>
                                                <img
                                                    src={
                                                        other.profile_pic_url ||
                                                        "/avatar.jpg"
                                                    }
                                                />
                                                <p>
                                                    {other.first} {other.last}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="no-user-found-box">
                {error && (
                    <>
                        <p className="error-msg-dark">
                            Oh oh, this user doesn't exist!
                        </p>
                        <iframe
                            src="https://giphy.com/embed/11lE4F9K9UlqRa"
                            width="480"
                            height="317"
                            frameBorder="0"
                            className="giphy-embed"
                            allowFullScreen
                        ></iframe>
                        <Link to="/">
                            <button className="btn-purple">
                                Back to my profile
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
