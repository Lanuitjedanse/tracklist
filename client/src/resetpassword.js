// reset password
import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            renderView: 1,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // emptyFields() {
    //     this.code.value = "";
    //     this.password.value = "";
    //     this.email.value = "";
    // }

    handleClick() {
        let route = [
            "none",
            "/password/reset/start",
            "/password/reset/verify",
            "/password/reset/verify",
        ];

        axios
            .post(route[this.state.renderView], this.state)
            .then((response) => {
                console.log("response from server: ", response);

                if (!response.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        error: false,
                        renderView: this.state.renderView === 1 ? 2 : 3,
                    });
                }
            })
            .catch((err) => {
                console.log("error in axios post login: ", err);
            });
    }

    determineView() {
        if (this.state.renderView === 1) {
            return (
                <div className="reg-box">
                    <h2 className="reset-title">Reset password</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Reset Password
                    </button>
                </div>
            );
        } else if (this.state.renderView === 2) {
            return (
                <div className="reg-box">
                    <h2 className="reset-title">Reset password</h2>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        type="text"
                        placeholder="Code"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Confirm
                    </button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div className="reg-box">
                    <h2 className="reset-title">
                        Yay your password was updated!
                    </h2>
                    <p>
                        You can now <Link to="/login">log in</Link> with your
                        new password!
                    </p>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="right-box">
                {this.determineView()}
                {this.state.error && <p>Oops something went wrong.</p>}
            </div>
        );
    }
}