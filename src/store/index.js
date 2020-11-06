import { createStore, applyMiddleware, compose } from "redux";

import ReduxThunk from "redux-thunk";
import reducer from "./rootReducer";

import socket from '../socket'
import { setUsers, setOnlineUsers, setLastMessage } from "./users/actions"
import { setPastMessages, setChats, setNewMessage } from "./chats/actions"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducer, enhancer);

//socket listeners_______________________
socket.on("userCreated", response => {
    const { users } = response
    store.dispatch(setUsers(users))
})

socket.on("usersData", response => {
    store.dispatch(setUsers(response))
})


socket.on("chatsFound", response => {
    const chats = response
    store.dispatch(setChats(chats))
})

socket.on("updatedOnlineUsers", response => {
    store.dispatch(setOnlineUsers(response))
})


socket.on("pastMessages", response => {
    store.dispatch(setPastMessages(response))
})

socket.on("incomingMessage", response => {
    const openedChatSenderId = store.getState().chats.sender.id;
    const userId = store.getState().user.id;
    const emittedMessageSenderId = response.senderId
    store.dispatch(setLastMessage(response))

    if (openedChatSenderId === emittedMessageSenderId || userId === emittedMessageSenderId) {
        store.dispatch(setNewMessage(response))
    } else {
        return
    }
})


export default store;
