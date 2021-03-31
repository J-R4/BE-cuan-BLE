import React, { useEffect } from 'react'
import { StockGraph, UserNameForm, StockDD } from '../components/index.js'
import { allStock } from '../allStock.js'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const stockId = process.env.REACT_APP_STOCK_API

const Stock = () => {
  const name = useSelector(state => state.name)
  const stockChartXValues = useSelector(state => state.stockChartXValues)
  const stockChartYValues = useSelector(state => state.stockChartYValues)
  const allSymbols = useSelector(state => state.allSymbols)
  const allNames = useSelector(state => state.allNames)
  const num = useSelector(state => state.num)
  const url = useSelector(state => state.url)
  const dispatch = useDispatch()

  // const [name, setName] = useState('')
  // const [stockChartXValues, setXValues] = useState([])
  // const [stockChartYValues, setYValues] = useState([])
  // const [allSymbols, setAllSymbol] = useState([])
  // const [allNames, setAllStockName] = useState([])
  // const [num, setNum] = useState(0)
  // const [url, setUrl] = useState('')

  useEffect(() => {
    fetchAllStock()
  }, [])

  useEffect(() => {
    if (allSymbols.length) {
      // fetchStock()
      dispatch({ type: 'url/set', payload: `detailStock/${allSymbols[num]}` })
      // setUrl(`detailStock/${allSymbols[num]}`) // 
    }
  }, [allSymbols, num])

  const fetchAllStock = () => {
    let allSt = []
    let allName = []

    allStock.forEach(el => {
      allSt.push(el.symbol)
      allName.push(el.name)
    })

    // setAllSymbol(allSt) //
    // setAllStockName(allName) //
    dispatch({ type: 'allSymbols/set', payload: allSt })
    dispatch({ type: 'allNames/set', payload: allName })

  }

  const addWatchlist = () => {
    dispatch({ type: 'watchlist/set', payload: allSymbols[num] })
  }

  const fetchStock = () => {
    let theNumber = num ? num : 0
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${allSymbols[theNumber]}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
          stockChartYValuesTemp.push(el.open)
        });
        dispatch({ type: 'xValue/set', payload: stockChartXValuesTemp })
        dispatch({ type: 'yValue/set', payload: stockChartYValuesTemp })

        // setXValues(stockChartXValuesTemp)
        // setYValues(stockChartYValuesTemp)
      })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="flex-col text-center items-center">
      <Link to="/">
        <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      </Link>
      <p className="">Welcome, {name ? name : 'Good People'}</p>
      <UserNameForm theName={(name) => dispatch({ type: 'name/set', payload: name })} />
      <br />
      <StockDD allName={allNames} theNum={(num) => dispatch({ type: 'num/set', payload: num })} />
      <br />
      <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
        Add to Your Watchlist
        {
          addWatchlist()
        }
      </button>
      <br />
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={stockChartYValues}>
        </StockGraph>
      }
      <Link to={url}>
        <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          {
            url ? `Detail of ${allNames[num]} Stock` : ''
          }
        </button>
      </Link>
    </div>
  )
}

export default Stock;
