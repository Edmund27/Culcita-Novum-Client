export const selectUsers = state => (
    state.users.users.filter(user => user.id !== state.user.id)
)

export const selectUserByName = (state, username) => (
    state.users.users.find(user => user.name === username)
)


export const selectOnlineUsers = (state) => (
    Object.keys(state.users.onlineUsers)
)