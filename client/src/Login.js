import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            dbError: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        axios
            .post("/login", this.state)
            .then((response) => {
                if (!response.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("error in axios post login: ", err);
            });
    }

    render() {
        return (
            <div className="right-box">
                <div className="reg-box">
                    <h2 className="login-title">Login</h2>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    ></input>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Login
                    </button>

                    <Link className="link-log" to="/">
                        Don't have an account yet? Click here to sign up
                    </Link>
                    <Link className="link-log" to="/password/reset/start">
                        Forgot your password? Click here to reset
                    </Link>

                    {this.state.error && (
                        <p className="error-msg">
                            This email or password doesn't exist. Please try
                            again.
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
