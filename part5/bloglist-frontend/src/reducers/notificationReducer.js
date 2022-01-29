const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SETTER':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SETTER',
        notification: notification
    }
}

export default reducer