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
        // this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    submit(e) {
        e.preventDefault();
        //Axios request
        // we can use code from imageboard
        // need to add column to users table profilepicurl
        let formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/profile-pic", formData)
            .then((response) => {
                // console.log("profile pic woop woop!");
                // console.log(
                //     "response.data.rows profile pic: ",
                //     response.data.rows
                // );

                this.props.setProfilePicUrl(response.data.rows);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                this.setState({
                    error: true,
                });
            });
        // formData.append("profilepic", this.state.file);
        // this.props.updateprofilePic(profilePicUrl);
        // update the state of app with the new profile pic once it is available
    }
    render() {
        console.log("this.prop in uploader: ", this.props);
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
