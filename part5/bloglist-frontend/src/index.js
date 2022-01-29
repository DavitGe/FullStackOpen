import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReeducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import App from './App'


const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
})
const store = createStore(
    reducer,
    composeWithDevTools()
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))