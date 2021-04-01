import { combineReducers } from 'redux'
import stockReducer from './stockReducer'
import watchReducer from './watchReducer'


const reducer = combineReducers({
  stocks: stockReducer,
  watchs: watchReducer
})

export default reducer