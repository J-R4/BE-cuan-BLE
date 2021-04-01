const initialState = {
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
      return state;
  }
}
export default reducer