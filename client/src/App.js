import { Component } from "react";
// import React from "react";
import axios from "./Axios";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = { uploaderVisible: false };
    }

    componentDidMount() {
        //TODO: Fetch current user's data from DB
        // Once you get the data back, set it to the state
        //req.session.userId (send it back with res.json)

        axios
            .get("/user", this.state)
            .then((response) => {
                console.log("axios get user");
                console.log("response.data.success: ", response);
                this.setState({
                    firstName: this.firstName,
                    lastName: this.lastName,
                    profilePicUrl: this.profilePicUrl,
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
        // TODO: Updates the "profilePicUrl" in the state
        // TODO: Hides the uploader
        this.setState({ profilePicUrl });
    }

    render() {
        return (
            <div className="app">
                <button
                    onClick={() => this.toggleUploader()} // need to change that
                ></button>
                <Logo />
                <ProfilePic
                    firstName={this.firstName}
                    lastName={this.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    toggleUploader={this.toggleUploader}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        setProfilePicUrl={() => this.setProfilePicUrl()}
                    />
                )}
            </div>
        );
    }
}
