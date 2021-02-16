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
        <div>
            <h1>Find other people</h1>
            {lastUsers &&
                lastUsers.map((user) => {
                    return (
                        <Link
                            to={`/user/${user.id}`}
                            key={user.id}
                            className="user-search"
                        >
                            <img
                                src={user.profile_pic_url || "/avatar.png"}
                                alt={`${user.first} ${user.last}`}
                            />
                            <p>{`${user.first} ${user.last}`}</p>
                        </Link>
                    );
                })}

            <input
                name="users"
                type="text"
                className="search-input"
                placeholder="find other users"
                onChange={(e) => setUserInput(e.target.value)}
                autoComplete="off"
            />

            {errorMessage && <p className="user-search">No one here!</p>}
            {errorMessage && (
                <iframe
                    src="https://giphy.com/embed/d2lcHJTG5Tscg"
                    width="480"
                    height="270"
                    frameBorder="0"
                    className="giphy-user"
                    allowFullScreen
                ></iframe>
            )}

            {userInput &&
                resultUsers.map((users, index) => {
                    return (
                        <Link
                            to={`/user/${users.id}`}
                            key={index}
                            className="user-search"
                        >
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
