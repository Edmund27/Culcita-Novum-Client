import { SET_USERS, SET_ONLINE_USERS, SET_LAST_MESSAGE } from "./actions";

const initialState = {
    users: [],
    onlineUsers: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.payload]
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            }
        case SET_LAST_MESSAGE:
            //console.log('from reducer', action.payload)
            const lastMessage = { message: action.payload.text, senderId: action.payload.senderId }
            const user = state.users.map((u) => {
                if (u.id === action.payload.receiverId || u.id === action.payload.senderId) {
                    return { ...u, chat: lastMessage };
                } else {
                    return { ...u };
                }
            });
            //console.log("User", user)
            return { ...state, users: user };

        default:
            return state;
    }
};