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

  const watchlist = useSelector(state => state.watchlist)
  const watchlistYValues = useSelector(state => state.watchlistYValues)
  const count = useSelector(state => state.count)
  const countTheCount = useSelector(state => state.countTheCount)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchAllStock()
  }, [])

  useEffect(() => {
    if (countTheCount !== count) {
      fetchWatchlist()
      dispatch({ type: 'countTheCount/set', payload: count })
    }
  }, [count])

  useEffect(() => {
    if (allSymbols.length) {
      fetchStock()
      dispatch({ type: 'url/set', payload: `detailStock/${allSymbols[num]}` })
    }
  }, [allSymbols, num])

  const fetchAllStock = () => {
    let allSt = []
    let allName = []

    allStock.forEach(el => {
      allSt.push(el.symbol)
      allName.push(el.name)
    })

    dispatch({ type: 'allSymbols/set', payload: allSt })
    dispatch({ type: 'allNames/set', payload: allName })

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
      })

      .catch((err) => {
        console.log(err)
      })
  }

  const addWatchlist = () => {
    let same = 0
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i] === allSymbols[num]) {
        same++
      }
    }
    if (!same) {
      dispatch({ type: 'watchlist/set', payload: allSymbols[num] })
      dispatch({ type: 'watchUrl/set', payload: `detailStock/${allSymbols[num]}` })
      dispatch({ type: 'watchNames/set', payload: `${allNames[num]}` })
      dispatch({ type: 'count/increment' })
    }
  }

  const fetchWatchlist = () => {
    let hitung = count === 0 ? count : count - 1
    let stockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${watchlist[hitung]}`
    console.log(theAPI)
    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartYValuesTemp.push(el.open)
        });

        dispatch({ type: 'watchYValue/set', payload: stockChartYValuesTemp })
        console.log(watchlistYValues, 'ini yvalue')
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
      <p className="">Welcome, <strong>{name ? name : 'Good People'}</strong></p>
      <UserNameForm theName={(name) => dispatch({ type: 'name/set', payload: name })} />
      <br />
      <StockDD allName={allNames} theNum={(num) => dispatch({ type: 'num/set', payload: num })} />
      <br />
      <button onClick={addWatchlist} className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
        Add to Your Watchlist
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
