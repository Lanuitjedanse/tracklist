// this will contain all of our actions
// an actions creator is a function that returns an object

import axios from "./Axios";

// export async function myFirstActionCreator() {
//     // we can optionally talk to the server here..

//     const { data } = await axios.get("/someroute");
//     return {
//         type: "UPDATE_STATE_SOMEHOW",
//         data: data.userId,
//     };
// }

export async function receiveFriendsWannabes() {
    const { data } = await axios.get(`/friends-wannabes`);

    if (data.success) {
        console.log("data.rows : ", data.rows);

        return {
            type: "SHOW_WANNABES",
            friendsList: data.rows,
        };
    }
}

export async function acceptFriend(id) {
    // const { data } = await axios.post("/check-friendship/accept", { id });

    // if (data.success) {
    //     console.log("data.rows.id: ", data.rows.id);
    //     return {
    //         type: "SHOW_FRIENDS",
    //         id: data.rows.id,
    //     };
    // }

    try {
        const { data } = await axios.post("/check-friendship/accept", { id });
        console.log("data.rows.id: ", data);

        return {
            type: "SHOW_FRIENDS",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}

export async function unfriend(id) {
    // const { data } = await axios.post("/check-friendship/end", { id });
    // console.log(("data: ", data));
    // console.log(("data.id: ", data.id));

    // console.log("data.rows.id: ", data.rows.id);

    // if (data.success) {
    //     return {
    //         type: "END_FRIENDSHIP",
    //         id: data.rows.id,
    //     };
    // }
    try {
        const { data } = await axios.post("/check-friendship/end", { id });
        console.log("data: ", data);
        return {
            type: "END_FRIENDSHIP",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}
