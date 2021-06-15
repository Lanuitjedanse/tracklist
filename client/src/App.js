import { Component } from "react";

import axios from "./Axios";
import Uploader from "./Uploader";
import Profile from "./Profile";
import Header from "./Header";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import { BrowserRouter, Route } from "react-router-dom";
import Friends from "./Friends";
import Chat from "./Chat";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploaderVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }

    componentDidMount() {
        axios
            .get("/api/user")
            .then((response) => {
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

    deletePic(profilePicUrl) {
        this.setState({
            profilePicUrl: profilePicUrl,
        });
    }

    render() {
        if (!this.state.id) {
            return (
                <div className="spinner-page">
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
                                deletePic={(profilePicUrl) =>
                                    this.deletePic(profilePicUrl)
                                }
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
                    <Route
                        path="/chat"
                        render={() => <Chat id={this.state.id} />}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
