import { CLEAR_CHAT, SET_CHATS, SET_PAST_MESSAGES, SET_SENDER_NAME, SET_NEW_MESSAGE } from "./actions";

const initialState = {
    messages: JSON.parse(localStorage.getItem("messages")),
    sender: JSON.parse(localStorage.getItem("sender"))
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS:
            return [
                ...action.payload
            ]
        case SET_PAST_MESSAGES:
            localStorage.setItem("messages", JSON.stringify(action.payload));
            return {
                ...state,
                messages: action.payload
            }
        case SET_SENDER_NAME:
            localStorage.setItem("sender", JSON.stringify(action.payload));
            return {
                ...state,
                sender: action.payload
            }

        case SET_NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case CLEAR_CHAT:
            localStorage.removeItem("messages");
            localStorage.removeItem("sender");
            return action.payload
        default:
            return state;
    }
};