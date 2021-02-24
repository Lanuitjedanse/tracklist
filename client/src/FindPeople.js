import { useState, useEffect } from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [lastUsers, setLastUsers] = useState("");
    const [resultUsers, setResultsUsers] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        console.log("useEffect is running!");
        axios
            .get("/users")
            .then(({ data }) => {
                // console.log("data: ", data);
                setLastUsers(data.rows);
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    }, []);

    useEffect(() => {
        let abort = false;
        if (userInput) {
            axios
                .get(`/find/${userInput}`)
                .then(({ data }) => {
                    console.log("data in find users: ", data);

                    if (!abort) {
                        setResultsUsers(data.users);
                        userInput && setErrorMessage(!data.success);
                    } else {
                        abort = true;
                    }
                })
                .catch((err) => {
                    console.log("error in axios find users: ", err);
                });
        }
    }, [userInput]);

    // console.log("users: ", users);

    return (
        <div className="user-search">
            <h3>Meet our three newest members!</h3>
            {lastUsers &&
                lastUsers.map((user) => {
                    return (
                        <Link to={`/user/${user.id}`} key={user.id}>
                            <img
                                src={user.profile_pic_url || "/avatar.png"}
                                alt={`${user.first} ${user.last}`}
                            />
                            <p>{`${user.first} ${user.last}`}</p>
                        </Link>
                    );
                })}

            <div className="search-field-box">
                <img className="magnifier" src="/magnifier-black.svg" />
                <input
                    name="users"
                    type="text"
                    placeholder="find other users"
                    onChange={(e) => setUserInput(e.target.value)}
                    autoComplete="off"
                />
            </div>

            {errorMessage && <p className="user-search">No one here!</p>}
            {errorMessage && (
                <iframe
                    src="https://giphy.com/embed/d2lcHJTG5Tscg"
                    width="300"
                    height="150"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            )}

            {userInput &&
                resultUsers.map((users, index) => {
                    return (
                        <Link to={`/user/${users.id}`} key={index}>
                            <img
                                src={users.profile_pic_url || "/avatar.png"}
                                alt={`${users.first} ${users.last}`}
                            />
                            <p>{`${users.first} ${users.last}`}</p>
                            <p>{users.error}</p>
                        </Link>
                    );
                })}
        </div>
    );
}

// return
//     <div>
//         <h1>Find people route</h1>
//         <p>
//             {user.first} {user.last}
//         </p>
//         <input
//             name="users"
//             type="text"
//             placeholder="users to search"
//             autoComplete="off"
// //         />

//     </div>
// );
