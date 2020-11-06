import React from "react";
import MessageInstance from "../MessageInstance"
import { useSelector } from "react-redux";
import { selectMessages } from "../../store/chats/selectors";
import { selectUser } from "../../store/user/selectors";
import { selectSender } from "../../store/chats/selectors";
require('../../style/general.css');
require('../../style/chat.css');

export default function Messages() {
    const messages = useSelector(selectMessages);
    const user = useSelector(selectUser)
    const sender = useSelector(selectSender)
    const userId = user.id
    let received = false
    let senderName



    return (
        <div className='messages'>
            {messages && messages.map((message, id) => {
                if (userId === message.senderId) {
                    received = false
                    senderName = user.name
                } else {
                    received = true
                    senderName = sender.name
                }
                return (
                    <MessageInstance
                        key={id}
                        username={senderName}
                        message={message.text}
                        image={sender.image}
                        time={message.createdAt}
                        received={received}
                    />
                )
            })
            }
        </div>
    );
}