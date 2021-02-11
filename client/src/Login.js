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
        // console.log("e.target.value", e.target.value);
        // console.log("e.target.name: ", e.target.name);
        this.setState({
            [e.target.name]: e.target.value,
        });
        // console.log(this.state);
        // () => console.log("this.state after setstate: ", this.state);
    }

    handleClick() {
        // 1. send a user's input off to the server in a POST
        // console.log("I handle the click");
        axios
            .post("/login", this.state)
            .then((response) => {
                // console.log("response from server: ", response);

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
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Login
                    </button>

                    <p>
                        Don't have an account yet? Click{" "}
                        <Link to="/">here</Link> to sign up
                    </p>
                    <p>
                        Forgot your password? Click{" "}
                        <Link to="/password/reset/start">here</Link> to reset
                    </p>

                    {this.state.error && (
                        <p>
                            This email or password doesn't exist. Please try
                            again.
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
