import { chatMessages, chatMessage, showNewMessage } from "./Actions";

import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("newMessage", (lastMessage) =>
            store.dispatch(showNewMessage(lastMessage))
        );
    }
};
