const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");

const cookieSession = require("cookie-session");
// const { hash, compare } = require("./bc");
const { hash } = require("./bc");

// const csurf = require("csurf");

let cookie_sec;

if (process.env.sessionSecret) {
    //we are in production
    cookie_sec = process.env.sessionSecret;
} else {
    cookie_sec = require("../secrets").sessionSecret;
}

app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: cookie_sec,
    })
); // equals to 2 weeks

app.get("/welcome", (req, res) => {
    console.log("I'm the welcome page");
    if (req.session.userId) {
        // if user is logged in redirect away from /welcome
        res.redirect("/");
    } else {
        // user not logged in so don't redirect
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", (req, res) => {
    console.log("I am the post registration route");

    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(password).then((hashedPw) => {
            db.insertUserData(first, last, email, hashedPw)
                .then(({ rows }) => {
                    // console.log("rows: ", rows);
                    req.session.userId = rows[0].id;

                    res.json({ success: true, data: rows[0] });
                })
                .catch((err) => {
                    console.log("error in insert user data", err);
                    res.json({ success: false });
                });
        });
    } else {
        console.log("please fill out every field");
        res.json({ success: false });
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        // if user not logged in redirect to welcome
        res.redirect("/welcome");
    } else {
        // if user logged in send over the html
        // once the client has the HTML start.js will render the <p>
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
