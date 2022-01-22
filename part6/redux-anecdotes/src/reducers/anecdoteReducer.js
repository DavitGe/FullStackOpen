const startData = [

]

var tempId = 0

function getId() {
    tempId = tempId + 1
    return tempId
}

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
        display: true
    }
}




const reducer = (state = startData, action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.data
        case 'VOTE':
            const tempAnecdote = state.find(anecdote => anecdote.id === action.data.id)
            const changedAnecdote = {
                ...tempAnecdote,
                votes: tempAnecdote.votes + 1
            }

            return state.map(anecdote => anecdote.id === action.data.id ? changedAnecdote : anecdote)
        case 'CREATE':
            const newAnecdote = asObject(action.data.anecdote)
            return [
                ...state,
                newAnecdote
            ]

        case 'FILTER':
            return state.map(anecdote => {
                if (anecdote.content.toLowerCase().includes(action.data.filterInp.toLowerCase())) {
                    return { ...anecdote, display: true }
                } else {
                    return { ...anecdote, display: false }
                }
            })

        default:
            return state.sort((firstEl, secEl) => {
                if (firstEl.votes > secEl.votes) {
                    return -1
                } else {
                    return 1
                }
            })
    }
}

export const initialState = ({ data }) => {
    return {
        type: 'INITIALIZE',
        data: data
    }
}

export const vote = ({ id }) => {
    return {
        type: 'VOTE',
        data: { id: id }
    }
}

export const createAnecdote = ({ anecdote }) => {
    if (anecdote !== '') {
        return {
            type: 'CREATE',
            data: { anecdote: anecdote }
        }
    }
}

export const filter = ({ filterInp }) => {
    return {
        type: 'FILTER',
        data: {
            filterInp: filterInp
        }
    }
}


export default reducer