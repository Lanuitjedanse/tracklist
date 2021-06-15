import React from "react";
import axios from "./Axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            error: false,
            bio: this.props.bio,
        };

        this.editingIsVisible = this.editingIsVisible.bind(this);
    }

    editingIsVisible() {
        this.setState({
            editingMode: !this.state.editingMode,
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    bioHandleClick(e) {
        e.preventDefault();
        axios
            .post("/bio", this.state)
            .then((response) => {
                this.setState({
                    bio: response.data.bio,
                    editingMode: false,
                });
            })
            .catch((err) => {
                console.log("error in axios post bio: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    render() {
        if (this.state.editingMode) {
            return (
                <div className="bio">
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={
                            this.state.bio
                                ? this.state.bio
                                : "Please tell us a bit more about yourself"
                        }
                        name="bio"
                    ></textarea>
                    <button
                        className="btn-purple"
                        onClick={(e) => this.bioHandleClick(e)}
                    >
                        Save Bio
                    </button>
                    {this.state.error && (
                        <p className="error-msg-dark">
                            Oops something went wrong! Please try again.
                        </p>
                    )}
                </div>
            );
        }

        return (
            <div className="bio border-acqua">
                <p className="bio-text">{this.state.bio}</p>
                <button
                    className="btn-purple"
                    onClick={() => this.editingIsVisible()}
                >
                    {this.state.bio ? "Edit Bio" : "Add Bio"}
                </button>
                {this.state.error && (
                    <p className="error-msg-dark">
                        Oops something went wrong! Please try again.
                    </p>
                )}
            </div>
        );
    }
}

{
    /* <p>{this.props.bio}</p>; */
}
