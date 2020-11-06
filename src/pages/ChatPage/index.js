import React from "react";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import socket from '../../socket'
import { selectUsers, selectOnlineUsers } from "../../store/users/selectors";
import { selectUser } from "../../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setSenderName } from "../../store/chats/actions";
import { useHistory } from "react-router-dom";
require('../../style/chat.css');


export default function ChatPage() {
    const users = useSelector(selectUsers)
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const onlineUsers = useSelector(selectOnlineUsers)
    const history = useHistory()

    const openChat = (receiver) => {
        history.push('/chat-screen')
        const usersObject = {
            user: currentUser,
            receiver: receiver
        }
        socket.emit('chat', usersObject)
        dispatch(setSenderName(receiver));
    }



    const render = <div>
        <ListGroup >

            {users && (users.map((user) => {
                if (user.chat) {
                    if (user.chat.message.length !== 0) {
                        return (
                            <ListGroup.Item variant="primary" key={user.id} as="li" action onClick={() => openChat(user)}>
                                <img
                                    className="avatar"
                                    variant="top"
                                    src={user.image === "test" ? "https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg" : user.image}
                                    width="100" height="60"
                                    alt="profile"
                                >
                                </img>

                                {user.name}
                                {onlineUsers.map((u) => {
                                    const onlineDot = u === user.id.toString() ?
                                        <Spinner key={u} animation="grow" variant="success" size="sm" /> : null
                                    return onlineDot
                                })}
                                {user.chat && (user.chat.message.length ?
                                    user.id !== user.chat.senderId ?
                                        <div>me: {user.chat.message} </div> :
                                        <div>{user.name}: {user.chat.message} </div> :
                                    <div>click to send you first message...</div>)}
                                {!user.chat && <div>click to send you first message...</div>}
                            </ListGroup.Item>
                        )
                    }
                }
            }))}
        </ListGroup>
    </div>


    return (
        <div>
            {render}
        </div>
    );
}