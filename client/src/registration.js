// registration.js
import React from "react";
import axios from "axios";

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
                console.log("response from server: ", response);
                // need to look at the response and make sure there is no error message sent from server
                // for example, the server might send back a msg that says
                // "the user forgot to fill in an input field"
                // in this case we need to render an error message for the user
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
            <div className="reg-box main-container">
                <h1>Sign up</h1>
                <p className="reg-text">
                    I am baby chia trust fund cred kale chips chartreuse celiac
                    irony schlitz. Shaman beard kitsch, farm-to-table cray
                    yuccie pour-over meh. Occupy helvetica gluten-free deep v
                    mlkshk wolf. Pickled irony man bun quinoa sustainable
                    leggings chartreuse, fixie jean shorts.
                </p>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="first"
                    type="text"
                    placeholder="First Name"
                ></input>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    type="text"
                    placeholder="Last Name"
                ></input>
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
                <button
                    className="btn-register"
                    onClick={() => this.handleClick()}
                >
                    Submit
                </button>
                {this.state.error && (
                    <p>Oops something went wrong! Please try again.</p>
                )}
            </div>
        );
    }
}
