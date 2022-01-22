const initialState = ''

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.notification
        case 'VOTE':
            return 'you voted anecdote: ID' + action.data.id
        case 'CREATE':
            return 'anecdote was created'
        default:
            return state
    }
}

export const setNotification = ({ notification }) => {
    return {
        type: 'CHANGE',
        notification: notification
    }
}


export default reducer