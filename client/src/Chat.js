import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { socket } from "./Socket";

export default function Chat(props) {
    const textRef = useRef("");
    const scrollRef = useRef();

    const allMessages = useSelector((state) => state.messages);

    const scrollToBottom = () => {
        scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    };

    useEffect(() => {
        scrollToBottom();
    });

    const messageHandleChange = (e) => {
        textRef.current.value = e.target.value;
    };

    const enterMessage = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (textRef.current.value != 0) {
            socket.emit("chatMessage", textRef.current.value);
            textRef.current.value = "";
        }
    };

    return (
        <div className="chat">
            <h2>Chat</h2>
            <div className="previous-messages" ref={scrollRef}>
                {allMessages &&
                    allMessages.map((msg) => (
                        <div
                            className={
                                props.id === msg.sender_id
                                    ? "chat-msg-box-purple"
                                    : "chat-msg-box-pink"
                            }
                            key={msg.id}
                        >
                            <div className="user-chat-box">
                                <img
                                    className="chat-pic"
                                    src={msg.profile_pic_url || "/avatar.png"}
                                />

                                <p>
                                    {msg.first} {msg.last} on{" "}
                                    {msg.created_at
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                    :
                                </p>
                            </div>
                            <p>{msg.message}</p>
                        </div>
                    ))}
            </div>

            <textarea
                ref={textRef}
                name="message"
                onKeyDown={(e) => enterMessage(e)}
                placeholder="Type your message"
                onChange={(e) => messageHandleChange(e)}
            ></textarea>
            <button className="btn-purple" onClick={() => sendMessage()}>
                Send
            </button>
        </div>
    );
}
