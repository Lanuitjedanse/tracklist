import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import FriendshipButton from "./FriendshipButton";
// import Playlist from "./Playlist";

export default class OtherProfileClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            profilePicUrl: this.props.profilePicUrl,
            bio: this.props.bio,
            error: false,
        };
    }
    updateFriendShipStatus(status) {
        this.setState(
            {
                friendship: status,
            },
            () => {}
        );
    }

    componentDidMount() {
        axios
            .get(`/show-users/${this.props.match.params.id}`)
            .then((response) => {
                if (this.props.match.params.id == response.data.cookie) {
                    return this.props.history.push("/");
                }

                this.setState({
                    id: response.data.rows.id,
                    firstName: response.data.rows.first,
                    lastName: response.data.rows.last,
                    profilePicUrl: response.data.rows.profile_pic_url,
                    bio: response.data.rows.bio,
                    error: false,
                });
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        if (this.state.id) {
            return (
                <div className="profile-box">
                    <img
                        className="profile-pic"
                        src={this.state.profilePicUrl || "/avatar.jpg"}
                        alt={`${this.state.firstName} ${this.state.lastName}`}
                    />
                    <h3>
                        {this.state.firstName} {this.state.lastName}
                    </h3>

                    <p className="bio-text">{this.state.bio}</p>
                    <FriendshipButton
                        id={this.state.id}
                        updateFriendShipStatus={(e) => {
                            this.updateFriendShipStatus(e);
                        }}
                    />
                </div>
            );
        }
        return (
            <div className="no-user-found-box">
                {this.state.error && (
                    <p className="error-msg-dark">
                        Oh oh, this user doesn't exist!
                    </p>
                )}
                <iframe
                    src="https://giphy.com/embed/11lE4F9K9UlqRa"
                    width="480"
                    height="317"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                ></iframe>

                <Link to="/">
                    <button className="btn-purple">Back to my profile</button>
                </Link>
            </div>
        );
    }
}
