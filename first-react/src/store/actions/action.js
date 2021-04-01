export const fetchStock = (payload) => {
  return (dispatch) => {
    const stockId = process.env.REACT_APP_STOCK_API
    dispatch({ type: 'loading/set', payload: true })
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let closeStockChartYValuesTemp = []
    let highStockChartYValuesTemp = []
    let lowStockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${payload}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
          stockChartYValuesTemp.push(el.open)
          closeStockChartYValuesTemp.push(el.close)
          highStockChartYValuesTemp.push(el.high)
          lowStockChartYValuesTemp.push(el.low)
        });
        dispatch({ type: 'xValue/set', payload: stockChartXValuesTemp })
        dispatch({ type: 'yValue/set', payload: stockChartYValuesTemp })
        dispatch({ type: 'closeValue/set', payload: closeStockChartYValuesTemp })
        dispatch({ type: 'highValue/set', payload: highStockChartYValuesTemp })
        dispatch({ type: 'lowValue/set', payload: lowStockChartYValuesTemp })
      })

      .catch((err) => {
        dispatch({ type: 'error/set', payload: err })
      })
      .finally(() => {
        dispatch({ type: 'loading/set', payload: false })
      })
    }
  }