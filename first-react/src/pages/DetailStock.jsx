import React, { useEffect } from 'react'
import { StockGraph } from '../components/index.js'
import { allStock } from '../allStock.js'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link,
  useParams
} from "react-router-dom";
import { HelperText } from '@windmill/react-ui'

const stockId = process.env.REACT_APP_STOCK_API

const Stock = () => {
  const name = useSelector(state => state.name)
  const stockChartXValues = useSelector(state => state.stockChartXValues)
  const stockChartYValues = useSelector(state => state.stockChartYValues)

  const closeStockChartYValues = useSelector(state => state.closeStockChartYValues)
  const highStockChartYValues = useSelector(state => state.highStockChartYValues)
  const lowStockChartYValues = useSelector(state => state.lowStockChartYValues)

  const stockName = useSelector(state => state.stockName)

  const dispatch = useDispatch()

  // const [name, setName] = useState('')
  // const [stockChartXValues, setXValues] = useState([])
  // const [stockChartYValues, setYValues] = useState([])

  // const [closeStockChartYValues, setCloseYValues] = useState([])

  // const [highStockChartYValues, setHighYValues] = useState([])

  // const [lowStockChartYValues, setLowYValues] = useState([])

  // const [stockName, setStockName] = useState('')

  const { symbol } = useParams()

  useEffect(() => {
    fetchAllStock()
    fetchStock()
  }, [])

  const fetchAllStock = () => {
    allStock.forEach(el => {
      if (el.symbol === symbol) {
        dispatch({ type: 'stockName/set', payload: el.name })
        // setStockName(el.name)
      }
    })
  }

  const fetchStock = () => {
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let closeStockChartYValuesTemp = []
    let highStockChartYValuesTemp = []
    let lowStockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${symbol}`

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

        // setXValues(stockChartXValuesTemp)
        // setYValues(stockChartYValuesTemp)
        // setCloseYValues(closeStockChartYValuesTemp)
        // setHighYValues(highStockChartYValuesTemp)
        // setLowYValues(lowStockChartYValuesTemp)
      })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="text-center">
      <Link to="/">
        <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      </Link>
      <br />
      <p>Hope you got enough cuan today, {name ? name : 'Good People'}</p>
      <br />
      <Link to='/stock'>
        <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Back
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-4 px-4 mx-auto">
        <div>
          <h1>Open Detail</h1>
          <StockGraph name={stockName}
            xValue={stockChartXValues}
            yValue={stockChartYValues}>
          </StockGraph>
        </div>
        <div>
          <h1>Close Detail</h1>
          <StockGraph name={stockName}
            xValue={stockChartXValues}
            yValue={closeStockChartYValues}>
          </StockGraph>
        </div>
        <div>
          <h1>High Detail</h1>
          <StockGraph name={stockName}
            xValue={stockChartXValues}
            yValue={highStockChartYValues}>
          </StockGraph>
        </div>
        <div>
          <h1>Low Detail</h1>
          <StockGraph name={stockName}
            xValue={stockChartXValues}
            yValue={lowStockChartYValues}>
          </StockGraph>
        </div>
      </div>
    </div>
  )
}

export default Stock;
