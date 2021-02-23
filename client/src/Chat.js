import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "./Axios";
import { chatMessage, chatMessages } from "./Actions";
import { socket } from "./Socket";

export default function Chat(props) {
    // const [message, setMessage] = useState();
    // const dispatch = useDispatch();
    const textRef = useRef("");
    const scrollRef = useRef();

    const allMessages = useSelector((state) => state.messages);
    // const cookie = useSelector((state) => state.cookie);

    const scrollToBottom = () => {
        scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    };

    useEffect(() => {
        scrollToBottom();
    });

    const messageHandleChange = (e) => {
        textRef.current.value = e.target.value;
        console.log(e.target.value);
    };

    const enterMessage = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        console.log("I was clicked");
        console.log("current text input ", textRef.current.value);
        console.log("current text input ", textRef.current.value.length);

        if (textRef.current.value != 0) {
            socket.emit("chatMessage", textRef.current.value);
            textRef.current.value = "";
        }

        // dispatch(sendMessage(textRef.current.value));

        // scrollToBottom();
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
