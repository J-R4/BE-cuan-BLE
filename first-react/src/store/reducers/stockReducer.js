import { allStock } from '../../allStock.js'

let allSt = []
let allName = []

allStock.forEach(el => {
  allSt.push(el.symbol)
  allName.push(el.name)
})

const initialState = {
  name: '',
  stockChartXValues: [],
  stockChartYValues: [],
  allSymbols: allSt,
  allNames: allName,
  num: 0,
  url: '',
  stockName: '',
  closeStockChartYValues: [],
  highStockChartYValues: [],
  lowStockChartYValues: [],
  isLoading: false,
  Error: ''
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
    case 'loading/set':
      return { ...state, isLoading: payload }
    case 'error/set':
      return { ...state, Error: payload }
    default:
      return state;
  }
}
export default reducer