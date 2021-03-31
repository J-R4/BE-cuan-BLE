import { createStore } from 'redux'

const initialState = {
  name: '',
  stockChartXValues: [],
  stockChartYValues: [],
  watchlistXValues: [],
  watchlistYValues: [],
  allSymbols: [],
  allNames: [],
  closeStockChartYValues: [],
  highStockChartYValues: [],
  lowStockChartYValues: [],
  stockName: '',
  num: 0,
  url: '',
  watchlist: []
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'name/set':
      return { ...state, name: payload }
    case 'xValue/set':
      return { ...state, stockChartXValues: payload }
    case 'yValue/set':
      return { ...state, stockChartYValues: payload }
    case 'allSymbols/set':
      return { ...state, allSymbols: payload }
    case 'allNames/set':
      return { ...state, allNames: payload }
    case 'num/set':
      return { ...state, num: payload }
    case 'url/set':
      return { ...state, url: payload }
    case 'stockName/set':
      return { ...state, stockName: payload }
    case 'closeValue/set':
      return { ...state, closeStockChartYValues: payload }
    case 'highValue/set':
      return { ...state, highStockChartYValues: payload }
    case 'lowValue/set':
      return { ...state, lowStockChartYValues: payload }
    case 'watchlist/set': 
      return { ...state, watchlist: state.watchlist.concat(payload) }
    case 'watchXValue/set':
      return { ...state, watchlistXValues: state.watchlistXValues.concat(payload) }
    case 'watchYValue/set':
      return { ...state, watchlistYValues: state.watchlistYValues.concat(payload) }
    default:
      break
  }
  return state
}

const store = createStore(reducer)

export default store;