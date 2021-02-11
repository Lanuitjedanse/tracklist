// registration.js
import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            dbError: false,
        };
        //strategy #1 for biding
        // this.handleChange = this.handleChange.bind(this);
    }

    // 1. we need to store the user's input in state
    // 2. when the user clicks "submit" we need to take the input we got from the user
    // and send it off to the server in a POST request

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
            .post("/registration", this.state)
            .then((response) => {
                // console.log("response from server: ", response);

                if (!response.data.success) {
                    //handle error
                    this.setState({
                        error: true,
                    });
                } else {
                    // if everything goes well redirect the user to "/" route
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("error in axios post registration: ", err);
            });
        // // how to conditionally render an error message
        // only run this code if there is an error
    }

    render() {
        return (
            <div className="right-box">
                <div className="reg-box">
                    <h2 className="signup-title">Sign up</h2>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    ></input>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Submit
                    </button>
                    <p>
                        Already have an account? Click{" "}
                        <Link to="/login">here</Link> to log in
                    </p>
                    {this.state.error && (
                        <p>Oops something went wrong! Please try again.</p>
                    )}
                </div>
            </div>
        );
    }
}
