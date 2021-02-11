import { Component } from "react";
// import React from "react";
import axios from "./Axios";

// import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import Header from "./Header";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }

    componentDidMount() {
        console.log("component mounted");

        axios
            .get("/user")
            .then((response) => {
                // console.log("axios get user");
                // console.log("response.data.success: ", response.data.rows);
                this.setState({
                    firstName: response.data.rows.first,
                    lastName: response.data.rows.last,
                    profilePicUrl: response.data.rows.profile_pic_url,
                    bio: response.data.rows.bio,
                    id: response.data.rows.id,
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
            uploaderVisible: false,
        });
    }

    render() {
        console.log("this.state in app: ", this.state);

        if (!this.state.id) {
            // return null;
            return (
                <div className="spinner-container">
                    <p>spinner container</p>
                </div>
            );
        }
        return (
            <div className="app">
                <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    uploaderVisible={this.state.uploaderVisible}
                    toggleUploader={this.toggleUploader}
                    size="small"
                />

                {this.state.uploaderVisible && (
                    <Uploader
                        setProfilePicUrl={(profilePicUrl) =>
                            this.setProfilePicUrl(profilePicUrl)
                        }
                    />
                )}
                <Profile
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profilePicUrl={this.state.profilePicUrl}
                    bio={this.state.bio}
                />
            </div>
        );
    }
}
