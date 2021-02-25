// import React from "react";
// import axios from "./Axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveFriendsWannabes, acceptFriend, unfriend } from "./Actions";

export default function Friends() {
    const dispatch = useDispatch();
    // const users = useSelector(
    //     (state) => state.users && state.users.filter((friend) => friend.id)
    // );

    const wannabes = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (friend) =>
                    friend.accepted == false && friend.sender_id == friend.id
            )
    );

    const friends = useSelector(
        (state) =>
            state.users && state.users.filter((friend) => friend.accepted)
    );

    const pendingFriends = useSelector(
        (state) =>
            state.users &&
            state.users.filter(
                (friend) =>
                    friend.accepted == false && friend.recipient_id == friend.id
            )
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes || !pendingFriends) {
        return null;
    }

    return (
        <div className="friends-req-box">
            <h2>{wannabes.length} Wannabes</h2>
            {wannabes.length === 0 && <p>No pending requests!</p>}
            <div className="friends">
                {wannabes &&
                    wannabes.map((friend) => (
                        <Link
                            to={`/user/${friend.id}`}
                            className="wannabes"
                            key={friend.id}
                        >
                            <img
                                src={friend.profile_pic_url || "/avatar.jpg"}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div className="button-box">
                                <button
                                    className="btn-purple btn-yes"
                                    onClick={() =>
                                        dispatch(acceptFriend(friend.id))
                                    }
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-no"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Ghost
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
            <h2>{friends.length} Friends</h2>
            {friends.length === 0 && <p>You have no friends, LOOOOSER!</p>}
            <div className="friends">
                {friends &&
                    friends.map((friend) => (
                        <Link
                            to={`/user/${friend.id}`}
                            className="real-friends"
                            key={friend.id}
                        >
                            <img
                                src={friend.profile_pic_url || "/avatar.jpg"}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div>
                                <button
                                    className="btn btn-no"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
            <h2>{pendingFriends.length} pending requests</h2>
            {pendingFriends.length === 0 && <p>No pending requests!</p>}
            <div className="friends">
                {pendingFriends &&
                    pendingFriends.map((friend) => (
                        <Link
                            className="wannabes"
                            to={`/user/${friend.id}`}
                            key={friend.id}
                        >
                            <img
                                src={friend.profile_pic_url || "/avatar.jpg"}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div>
                                <button
                                    className="btn btn-no"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
