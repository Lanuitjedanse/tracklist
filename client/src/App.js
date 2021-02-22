import { Component } from "react";
// import React from "react";
import axios from "./Axios";
// import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import Header from "./Header";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import { BrowserRouter, Route } from "react-router-dom";
import Friends from "./Friends";
import Chat from "./Chat";

// import { io } from "socket.io-client";

// const socket = io.connect;
// socket.on("hello", (data) => {
//     console.log("data: ", data);
// });

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
            .get("/api/user")
            .then((response) => {
                // console.log("axios get user");
                // console.log("response.data.success: ", response.data.rows);
                this.setState({
                    firstName: response.data.rows.first,
                    lastName: response.data.rows.last,
                    profilePicUrl: response.data.rows.profile_pic_url,
                    bio: response.data.rows.bio,
                    // playlist: response.data.rows.playlist,
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

    setDeletePic(profilePicUrl) {
        this.setState({
            profilePicUrl: profilePicUrl,
        });
    }

    render() {
        // console.log("this.state in app: ", this.state);

        if (!this.state.id) {
            // return null;
            return (
                <div className="spinner-container">
                    <img src="/loading.svg" className="spinner" />
                </div>
            );
        }
        return (
            <BrowserRouter>
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
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                profilePicUrl={this.state.profilePicUrl}
                                bio={this.state.bio}
                                toggleUploader={this.toggleUploader}
                                setDeletePic={(profilePicUrl) =>
                                    this.setDeletePic(profilePicUrl)
                                }
                                // playlist={this.state.playlist}
                            />
                        )}
                    />
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                                playlist={props.playlist}

                                // playlist={this.state.playlist}
                            />
                        )}
                    />
                    <Route
                        path="/find-users"
                        render={() => (
                            <FindPeople
                                id={this.state.id}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                profilePicUrl={this.state.profilePicUrl}
                            />
                        )}
                    />
                    <Route path="/show-my-friends" render={() => <Friends />} />
                    <Route path="/chat" component={Chat} />
                </div>
            </BrowserRouter>
        );
    }
}

//  <Route
//      path="/show-my-friends"
//      render={() => (
//          <Friends
//              id={this.state.id}
//              firstName={this.state.firstName}
//              lastName={this.state.lastName}
//              profilePicUrl={this.state.profilePicUrl}
//          />
//      )}
//  />;
// make sure to not name the route and axios the same otherwise you will see json
