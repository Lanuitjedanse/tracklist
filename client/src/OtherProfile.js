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
                // console.log("response: ", response);
                // console.log(response.data.playlist);
                if (props.match.params.id == response.data.cookie) {
                    return this.props.history.push("/");
                    //make sure server sends back loggedin user id
                }

                setId(response.data.rows.id);
                setFirstName(response.data.rows.first);
                setLastName(response.data.rows.last);
                setProfilePicUrl(response.data.rows.profile_pic_url);
                setBio(response.data.rows.bio);
                setError(false);
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
                            src={profilePicUrl || "/avatar.png"}
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
                                <img src={profilePicUrl || "/avatar.png"} />
                                <img
                                    src={
                                        userMe.profile_pic_url || "/avatar.png"
                                    }
                                />
                            </div>
                            <p>{firstName} and I are friends</p>
                        </div>
                    )}

                    {otherFriends.length != 0 && (
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
                                                        "/avatar.png"
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

            {error && (
                <div className="no-user-found-box">
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
                </div>
            )}
        </div>
    );
}

// export default class OtherProfile extends Component {
//     updateFriendShipStatus(status) {
//         this.setState(
//             {
//                 friendship: status,
//             },
//             () => {
//                 console.log("this.state.friendship: ", this.state.friendship);
//             }
//         );
//     }

//     componentDidMount() {
//         //we want to make an axios request to server to get other user's info
//         // console.log("this.props.match: ", this.props.match.params.id);
//         // take care of situation where user tries to access
//         // his own profile and we have to redirect in that case to '/' route to render his own component
//         axios
//             .get(`/show-users/${this.props.match.params.id}`)
//             .then((response) => {
//                 // console.log("response: ", response);
//                 console.log(response.data.playlist);
//                 if (this.props.match.params.id == response.data.cookie) {
//                     return this.props.history.push("/");
//                     //make sure server sends back loggedin user id
//                 }

//                 this.setState({
//                     id: response.data.rows.id,
//                     firstName: response.data.rows.first,
//                     lastName: response.data.rows.last,
//                     profilePicUrl: response.data.rows.profile_pic_url,
//                     bio: response.data.rows.bio,
//                     // playlist: response.data.rows.playlist,
//                     error: false,
//                 });
//             })
//             .catch((err) => {
//                 console.log("error in axios api/user: ", err);
//                 this.setState({
//                     error: true,
//                 });
//             });
//     }

//     render() {
//         if (this.state.id) {
//             return (
//                 <div className="profile-box">
//                     <img
//                         className="profile-pic"
//                         src={this.state.profilePicUrl || "/avatar.png"}
//                         alt={`${this.state.firstName} ${this.state.lastName}`}
//                     />
//                     <h3>
//                         {this.state.firstName} {this.state.lastName}
//                     </h3>

//                     <p className="bio-text">{this.state.bio}</p>
//                     <FriendshipButton
//                         id={this.state.id}
//                         updateFriendShipStatus={(e) => {
//                             this.updateFriendShipStatus(e);
//                         }}
//                     />
//                 </div>
//             );
//         }
//         return (
//             <div className="no-user-found-box">
//                 {this.state.error && (
//                     <p className="error-msg-dark">
//                         Oh oh, this user doesn't exist!
//                     </p>
//                 )}
//                 <iframe
//                     src="https://giphy.com/embed/11lE4F9K9UlqRa"
//                     width="480"
//                     height="317"
//                     frameBorder="0"
//                     className="giphy-embed"
//                     allowFullScreen
//                 ></iframe>

//                 <Link to="/">
//                     <button className="btn-purple">Back to my profile</button>
//                 </Link>
//             </div>
//         );
//     }
// }

// //    <Playlist id={this.state.id} playlist={this.state.playlist} />;
