import { Component } from "react";
// import React from "react";
import axios from "./Axios";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }

    componentDidMount() {
        //TODO: Fetch current user's data from DB
        // Once you get the data back, set it to the state
        //req.session.userId (send it back with res.json)
        axios
            .get("/user")
            .then((response) => {
                console.log("axios get user");
                console.log("response.data.success: ", response.data.rows);
                this.setState({
                    firstName: response.data.rows.first,
                    lastName: response.data.rows.last,
                    profilePicUrl: response.data.rows.profile_pic_url,
                });
            })
            .catch((err) => {
                console.log("err in axios user: ", err);
            });
    }

    toggleUploader() {
        this.setState({
            uploaderVisible: !this.state.uploaderVisible,
        });
    }

    setProfilePicUrl(profilePicUrl) {
        this.setState({
            profilePicUrl: profilePicUrl,
            // uploaderVisible: false,
        });
    }

    render() {
        return (
            <div className="app">
                <button
                    onClick={() => this.toggleUploader()} // need to change that
                >
                    button
                </button>
                <Logo />
                <ProfilePic
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    uploaderVisible={this.state.uploaderVisible}
                    toggleUploader={this.toggleUploader}
                />
                {this.state.uploaderVisible && (
                    <Uploader setProfilePicUrl={this.setProfilePicUrl} />
                )}
            </div>
        );
    }
}
