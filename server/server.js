const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const s3 = require("./s3");
const config = require("../config");
const { uploader } = require("./upload");

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

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

// app.post("/registration", (req, res) => {
//     console.log("I am the post registration route");

//     const { first, last, email, password } = req.body;
//     if (first && last && email && password) {
//         hash(password).then((hashedPw) => {
//             db.insertUserData(first, last, email, hashedPw)
//                 .then(({ rows }) => {
//                     // console.log("rows: ", rows);
//                     req.session.userId = rows[0].id;

//                     res.json({ success: true, data: rows[0] });
//                 })
//                 .catch((err) => {
//                     console.log("error in insert user data", err);
//                     res.json({ success: false });
//                 });
//         });
//     } else {
//         console.log("please fill out every field");
//         res.json({ success: false });
//     }
// });

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;

    if (first && last && email && password) {
        try {
            const hashedPw = await hash(password);
            const results = await db.insertUserData(
                first,
                last,
                email,
                hashedPw
            );
            req.session.userId = results.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST registration", err);
            res.json({ success: false });
            //error.message gives only the message from error and not the whole block
            //error.code
        }
    } else {
        res.json({ success: false });
        // please fill out all fields error
    }
});

app.post("/login", (req, res) => {
    console.log("I am the post login route");
    const { email, password } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            const hashedPw = rows[0].password;
            console.log("user trying to login");
            console.log("rows: ", rows);

            compare(password, hashedPw)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        req.session.loggedIn = rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("err in compare:", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("there was an error in post login: ", err);
            res.json({ success: false });
        });
});

app.get("/user", (req, res) => {
    console.log("I'm the user get route");
    console.log(req.session.userId);
    db.fetchUserData(req.session.userId)
        .then(({ rows }) => {
            console.log("getting all user info");
            console.log("rows", rows[0]);
            res.json({ success: true, rows: rows[0] });
        })
        .catch((err) => {
            console.log("there was an error in fetching user data: ", err);
            res.json({ success: false });
        });
});

app.post("/profile-pic", uploader.single("file"), s3.upload, (req, res) => {
    console.log("I'm the post route user/profile-pic");
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;

    console.log("req.session.userId: ", req.session.userId);

    if (req.file) {
        db.uploadPic(req.session.userId, fullUrl)
            .then(({ rows }) => {
                // console.log(
                //     "rows[0].profile_pic_url : ",
                //     rows[0].profile_pic_url
                // );
                res.json({ success: true, rows: rows[0].profile_pic_url });
            })
            .catch((err) => {
                console.log(
                    "there was an error with uploading profile pic: ",
                    err
                );
                res.json({ success: false });
            });
    } else {
        console.log("please add a file!");
        res.json({ success: false });
    }
});

app.post("/bio", (req, res) => {
    console.log("I am the bio post route");
    const { bio } = req.body;

    db.editBio(req.session.userId, bio)
        .then(({ rows }) => {
            console.log("rows:", rows[0].bio);
            res.json({ success: true, bio: rows[0].bio });
        })
        .catch((err) => {
            console.log("there was an error in edit bio post: ", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/start", (req, res) => {
    console.log("I am the /password/reset/start route");
    const { email } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            console.log("the user exists!");
            console.log("rows :", rows);
            const emailDB = rows[0].email;
            console.log("emaildb: ", emailDB);
            // generates a random code
            const secretCode = cryptoRandomString({
                length: 6,
            });
            if (req.body.email === emailDB) {
                db.insertCode(email, secretCode)
                    .then(() => {
                        console.log("rows :", rows);
                        console.log("code was inserted in DB");

                        sendEmail(
                            email,
                            secretCode,
                            "Here is your code to reset your password"
                        )
                            .then(() => {
                                console.log("rows :", rows);
                                console.log("yay");
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "error in send email with code",
                                    err
                                );
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "there was an error in inserting the code: ",
                            err
                        );
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("there was an error in password reset: ", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("I am the /password/reset/verify route");
    const { code, password } = req.body;

    db.verifyCode(code)
        .then(({ rows }) => {
            const emailCode = rows[0].email;
            // const codeDB = rows[0].code;

            let currentCode = rows.find((row) => {
                return row.code === req.body.code;
            });

            if (currentCode) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePassword(emailCode, hashedPw)
                            .then(() => {
                                // console.log("rows: ", rows);

                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in insert user data", err);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in hashing pass: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("There was an error with verifying code: ", err);
        });
    /*
        1.verify the code the user entered is correct
        2. take a new password, hash it, and store it in users - upsert probably needed 
    */

    /*
        verifying the code
        1. make select request to reset_codes to retrieve code 
        2. we give users 10 min to enter new password using this code 

        SELECT * FROM my_table
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
    */

    /*  IF CODE EXPIRED 
        if the code is expired we need to send back a message to react (user needs to enter email again)

        IF CODE NOT EXPIRED
        check if the code we received from the user (req.body) matches code in DB

        IF CODE DON'T MATCH
        send back response to react indicating failure error (success: false)
        React should allow user to enter again the code

        IF CODE MATCH
        hash password, update users and send back a success: true message to react 
    */
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", (req, res) => {
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
