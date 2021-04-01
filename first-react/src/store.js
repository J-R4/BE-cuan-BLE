import { createStore } from 'redux'

const initialState = {
  name: '',
  stockChartXValues: [],
  stockChartYValues: [],
  allSymbols: [],
  allNames: [],
  num: 0,
  url: '',
  stockName: '',
  closeStockChartYValues: [],
  highStockChartYValues: [],
  lowStockChartYValues: [],
  watchlist: [],
  watchlistXValues: [],
  watchlistYValues: [],
  watchUrl: [],
  watchNames: [],
  count: 0,
  countTheCount: 0
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
      return { ...state, watchlistXValues: [...state.watchlistXValues, payload] }
    case 'watchYValue/set':
      return { ...state, watchlistYValues: [...state.watchlistYValues, payload] }
    case 'watchUrl/set':
      return { ...state, watchUrl: state.watchUrl.concat(payload) }
    case 'watchNames/set':
      return { ...state, watchNames: state.watchNames.concat(payload) }
    case 'count/increment':
      return { ...state, count: state.count + 1 }
    case 'count/decrement':
      return { ...state, count: state.count - 1 }
    case 'countTheCount/set':
      return { ...state, countTheCount: payload }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store;