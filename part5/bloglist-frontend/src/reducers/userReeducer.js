const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data.users
        default:
            return state
    }
}

export const setUser = (users) => {
    return {
        type: 'SET_USER',
        data: {
            users: users
        }
    }
}

export default reducer