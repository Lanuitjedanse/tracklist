import React from "react";
import axios from "./Axios";
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
            state.users.filter((friend) => friend.accepted == false)
    );

    const friends = useSelector(
        (state) =>
            state.users && state.users.filter((friend) => friend.accepted)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes) {
        return null;
    }

    return (
        <div className="friends-req-box">
            <h2>Wannabes</h2>
            <div className="friends">
                {wannabes &&
                    wannabes.map((friend) => (
                        <div className="wannabes" key={friend.id}>
                            <img src={friend.profile_pic_url} />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div>
                                <button
                                    className="btn-purple"
                                    onClick={() =>
                                        dispatch(acceptFriend(friend.id))
                                    }
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <h2>Friends</h2>
            <div className="friends">
                {friends &&
                    friends.map((friend) => (
                        <div className="real-friends" key={friend.id}>
                            <img src={friend.profile_pic_url} />
                            <p>
                                {friend.first} {friend.last}
                            </p>
                            <div>
                                <button
                                    className="btn-purple"
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
        </div>
    );
}
