import axios from "./Axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get(`/friends-wannabes`);

    if (data.success) {
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

        return {
            type: "END_FRIENDSHIP",
            id: id,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}

export function chatMessage(text) {
    return {
        type: "SEND_MESSAGE",
        text,
    };
}

export function chatMessages(messages) {
    return {
        type: "SHOW_MESSAGES",
        messages,
    };
}

export function showNewMessage(newMessage) {
    return {
        type: "SHOW_NEW_MESSAGE",
        newMessage,
    };
}
