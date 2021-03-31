import React, { useState, useEffect } from 'react'
import { StockGraph } from '../components/index.js'
import { allStock } from '../allStock.js'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const stockId = process.env.REACT_APP_STOCK_API

const Watch = () => {
  const name = useSelector(state => state.name)
  const watchlistXValues = useSelector(state => state.watchlistXValues)
  const watchlistYValues = useSelector(state => state.watchlistYValues)
  const allSymbols = useSelector(state => state.allSymbols)
  const allNames = useSelector(state => state.allNames)
  const num = useSelector(state => state.num)
  const url = useSelector(state => state.url)
  const watchlist = useSelector(state => state.watchlist)

  const dispatch = useDispatch()

  // const [name, setName] = useState('')
  // const [stockChartXValues, setXValues] = useState([])
  // const [stockChartYValues, setYValues] = useState([])
  // const [allSymbols, setAllSymbol] = useState([])
  // const [allNames, setAllStockName] = useState([])
  // const [num, setNum] = useState(0)
  // const [url, setUrl] = useState('')

  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchAllStock()
  }, [])

  useEffect(() => {
    if (allSymbols.length) {
      console.log(watchlist, '<<<<<<<<< ini wl')
      for (let i = 0; i < watchlist.length; i++) {
        setCount(i)
        // fetchStock()
      }
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

  const fetchStock = () => {
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${watchlist[count]}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
          stockChartYValuesTemp.push(el.open)
        });

        dispatch({ type: 'watchXValue/set', payload: stockChartXValuesTemp })
        dispatch({ type: 'watchYValue/set', payload: stockChartYValuesTemp })

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
        <img className="object-center md:object-top mx-auto" src="../CUAN.PNG" alt="CM Logo" width="200px" height="500px" />
      </Link>
      {
        watchlist.length ? <p className="">Here is your WatchList, {name ? name : 'Good People'}</p> : <p>You doesn't have any watchlist yet, add it on the stocklist :)</p>
      }
      <br />
      {
        watchlist.map((wl, i) => {
          <StockGraph name={allNames[num]}
            xValue={watchlistXValues[i]}
            yValue={watchlistYValues[i]}>
          </StockGraph>
        })
      }
      <Link to={url}>
        <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          {
            url ? `Go to Detail of ${allNames[num]}` : ''
          }
        </button>
      </Link>
    </div>
  )
}

export default Watch;
