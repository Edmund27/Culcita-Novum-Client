export const SET_USERS = 'SET_USERS';
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
export const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE';


export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const setOnlineUsers = (onlineUsers) => {
    return {
        type: SET_ONLINE_USERS,
        payload: onlineUsers
    }
}

export const setLastMessage = (message) => {
    //console.log("UPDATE??????")
    return {
        type: SET_LAST_MESSAGE,
        payload: message
    }
}