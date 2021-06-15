import { Component } from "react";
import axios from "./Axios";
// import ProfilePic from "./ProfilePic";
// export function Uploader() {
//     return <div className="uploader"></div>;
// }

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            file: null,
        };
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    submit(e) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/profile-pic", formData)
            .then((response) => {
                this.props.setProfilePicUrl(response.data.rows);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                this.setState({
                    error: true,
                });
            });
    }
    render() {
        return (
            <div className="uploader border-orange">
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="file"
                    type="file"
                    accept="image/*"
                ></input>
                <button className="btn" onClick={(e) => this.submit(e)}>
                    Upload
                </button>
                {this.state.error && (
                    <p className="error-msg-dark">Oops something went wrong.</p>
                )}
            </div>
        );
    }
}
