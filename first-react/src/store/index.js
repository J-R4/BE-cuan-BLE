import { createStore, applyMiddleware } from 'redux'
import logger from './middlewares/logger'
import reducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store