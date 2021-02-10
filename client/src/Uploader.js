import Component from "react";
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
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.file = e.target.files[0];
    }

    submit() {
        //Axios request
        // we can use code from imageboard
        // need to add column to users table profilepicurl
        const formData = new FormData();
        formData.append("profilePic", this.state);

        axios
            .post("/profile-pic", this.state)
            .then((response) => {
                console.log("profile pic woop woop!");
                if (response.data.success) {
                    this.setState({
                        error: false,
                        file: this.file,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
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
        return (
            <div className={"uploader"}>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="file"
                ></input>
                <button onClick={this.submit}>Upload</button>
                {this.state.error && <p>Oops something went wrong.</p>}
            </div>
        );
    }
}

//  fd.append("title", this.title);
//     fd.append("description", this.description);
//     fd.append("username", this.username);
//     fd.append("file", this.file);

//     axios
//         .post("/upload", fd)
//         .then(function (response) {
//             if (response.data.success) {
//                 self.errorMessage = null;
//                 self.images.unshift(response.data.data);
//                 self.title = "";
//                 self.description = "";
//                 self.username = "";
//                 self.$refs.fileInput.value = null;
//             } else {
//                 self.errorMessage = "File missing";
//                 console.log("error");
//             }
//         })
//         .catch(function (err) {
//             console.log("error in post upload: ", err);
//             self.errorMessage =
//                 "Fill out all the fields, or file is too large (max 2MB)";
//             self.title = "";
//             self.description = "";
//             self.username = "";
//             self.$refs.fileInput.value = null;
//         });
// },

// fileSelectHandler: function (e) {
//     this.file = e.target.files[0];
// },
