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
        // console.log("hello");
        e.preventDefault();
        axios
            .post("/bio", this.state)
            .then((response) => {
                console.log("response: ", response);

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
        console.log("this.props in bio editor: ", this.props);

        if (this.state.editingMode) {
            return (
                <div>
                    <h1>Edit mode</h1>
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={
                            this.state.bio
                                ? `${this.state.bio}`
                                : "Please tell us a bit more about yourself"
                        }
                        name="bio"
                    ></textarea>
                    <button onClick={(e) => this.bioHandleClick(e)}>
                        Save Bio
                    </button>
                    {this.state.error && (
                        <p>Oops something went wrong! Please try again.</p>
                    )}
                </div>
            );
        }

        return (
            <div className="bio border-acqua">
                <h1>I am the bio editor</h1>
                <p>{this.state.bio}</p>
                <button onClick={() => this.editingIsVisible()}>
                    {this.state.bio ? "Edit Bio" : "Add Bio"}
                </button>
                {this.state.error && (
                    <p>Oops something went wrong! Please try again.</p>
                )}
            </div>
        );
    }
}

{
    /* <p>{this.props.bio}</p>; */
}
