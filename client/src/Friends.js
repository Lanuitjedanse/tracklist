// import React from "react";
// import axios from "./Axios";
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
            <h2>Wannabes</h2>

            <div className="friends">
                {wannabes.length === 0 && <p>No pending requests!</p>}
                {wannabes &&
                    wannabes.map((friend) => (
                        <div className="wannabes" key={friend.id}>
                            <img
                                src={friend.profile_pic_url || "/avatar.png"}
                            />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div>
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
                        </div>
                    ))}
            </div>
            <h2>Friends</h2>
            <div className="friends">
                {friends.length === 0 && <p>You have no friends, LOOOOSER!</p>}
                {friends &&
                    friends.map((friend) => (
                        <div className="real-friends" key={friend.id}>
                            <img
                                src={friend.profile_pic_url || "/avatar.png"}
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
                        </div>
                    ))}
            </div>
            <h2>My pending requests</h2>
            <div className="friends">
                {pendingFriends.length === 0 && <p>No pending requests!</p>}
                {pendingFriends &&
                    pendingFriends.map((friend) => (
                        <div className="wannabes" key={friend.id}>
                            <img
                                src={friend.profile_pic_url || "/avatar.png"}
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
                        </div>
                    ))}
            </div>
        </div>
    );
}
