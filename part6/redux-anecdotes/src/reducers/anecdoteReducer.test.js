import anecdoteReducer from './anecdoteReducer'
import { createStore } from 'redux'

const store = createStore(anecdoteReducer)
describe('Anecdote reducer', () => {
    test('voting is working', async () => {
        await store.dispatch({
            type: 'VOTE',
            data: {
                id: 1
            }
        })
        expect(store.getState()[0].votes).toBe(1)
    })

    test('anecdotes are creating', async () => {
        await store.dispatch({
            type: 'CREATE',
            data: {
                anecdote: 'blablabla'
            }
        })
        const state = store.getState()
        expect(state.length).toBe(7)
    })
})