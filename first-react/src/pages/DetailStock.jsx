import React, { useEffect } from 'react'
import { StockGraph } from '../components/index.js'
import { allStock } from '../allStock.js'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link,
  useParams
} from "react-router-dom";

// const stockId = process.env.REACT_APP_STOCK_API
const stockId = a3973ebb793d184e80baa05ca8d7bb33

const Stock = () => {
  const name = useSelector(state => state.name)
  const stockChartXValues = useSelector(state => state.stocks.stockChartXValues)
  const stockChartYValues = useSelector(state => state.stocks.stockChartYValues)

  const closeStockChartYValues = useSelector(state => state.stocks.closeStockChartYValues)
  const highStockChartYValues = useSelector(state => state.stocks.highStockChartYValues)
  const lowStockChartYValues = useSelector(state => state.stocks.lowStockChartYValues)

  const stockName = useSelector(state => state.stocks.stockName)

  const isLoading = useSelector(state => state.stocks.isLoading)
  const Error = useSelector(state => state.stocks.Error)

  const dispatch = useDispatch()

  const { symbol } = useParams()

  useEffect(() => {
    fetchAllStock()
    fetchStock()
  }, [])

  const fetchAllStock = () => {
    allStock.forEach(el => {
      if (el.symbol === symbol) {
        dispatch({ type: 'stockName/set', payload: el.name })
      }
    })
  }

  const fetchStock = () => {
    let stockChartYValuesTemp = []
    let closeStockChartYValuesTemp = []
    let highStockChartYValuesTemp = []
    let lowStockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${symbol}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartYValuesTemp.push(el.open)
          closeStockChartYValuesTemp.push(el.close)
          highStockChartYValuesTemp.push(el.high)
          lowStockChartYValuesTemp.push(el.low)
        });

        dispatch({ type: 'yValue/set', payload: stockChartYValuesTemp })
        dispatch({ type: 'closeValue/set', payload: closeStockChartYValuesTemp })
        dispatch({ type: 'highValue/set', payload: highStockChartYValuesTemp })
        dispatch({ type: 'lowValue/set', payload: lowStockChartYValuesTemp })
      })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="text-center">
      <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      <br />
      <p>Hope you got enough <i>cuan</i> today, <strong>{name ? name : 'Good People'}</strong></p>
      <br />
      {
        Error && <p>{Error}</p>
      }
      <Link to='/watch'>
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Watchlist
        </button>
      </Link>
      <span> - </span>
      <Link to='/'>
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Home
        </button>
      </Link>
      <span> - </span>
      <Link to='/stock'>
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Stocklist
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-4 px-4 mx-auto">
        <div>
          <h1>Open Detail</h1>
          {isLoading ? <p>"loading..."</p> :
            <StockGraph name={stockName}
              xValue={stockChartXValues}
              yValue={stockChartYValues}>
            </StockGraph>}
        </div>
        <div>
          <h1>Close Detail</h1>
          {isLoading ? <p>"loading..."</p> :
            <StockGraph name={stockName}
              xValue={stockChartXValues}
              yValue={closeStockChartYValues}>
            </StockGraph>}
        </div>
        <div>
          <h1>High Detail</h1>
          {isLoading ? <p>"loading..."</p> :
            <StockGraph name={stockName}
              xValue={stockChartXValues}
              yValue={highStockChartYValues}>
            </StockGraph>}
        </div>
        <div>
          <h1>Low Detail</h1>
          {isLoading ? <p>"loading..."</p> :
            <StockGraph name={stockName}
              xValue={stockChartXValues}
              yValue={lowStockChartYValues}>
            </StockGraph>}
        </div>
      </div>
    </div>
  )
}

export default Stock;
