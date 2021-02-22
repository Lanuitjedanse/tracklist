import axios from "./Axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get(`/friends-wannabes`);

    if (data.success) {
        console.log("data.rows : ", data.rows);

        return {
            type: "SHOW_WANNABES",
            friendsList: data.rows,
            userId: data.userId,
        };
    }
}

export async function acceptFriend(id) {
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

export function chatMessage(text) {
    // socket.emit("chatMessage", text);

    return {
        type: "SEND_MESSAGE",
        text,
    };
}

export function chatMessages(messages) {
    // socket.emit("chatMessages", messages);
    console.log("messages: ", messages);

    return {
        type: "SHOW_MESSAGES",
        messages,
    };
}

export function showNewMessage(newMessage) {
    console.log("messages: ", newMessage);

    return {
        type: "SHOW_NEW_MESSAGE",
        newMessage,
    };
}

// export async function pendingFriends(id) {
//     try {
//         const { data } = await axios.post("/check-friendship/end", { id });
//         console.log(("pending data: ", data));
//         console.log("acceptFriend data.rows.id", data.rows);
//         console.log("data.rows : ", data.rows[0].sender_id);

//         if (data.rows[0].sender_id === id) {
//             return {
//                 type: "SHOW_PENDING",
//                 id: id,
//             };
//         }
//     } catch (err) {
//         console.log("err pending friend: ", err);
//     }
// }
