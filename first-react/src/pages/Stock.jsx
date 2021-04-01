import React, { useEffect } from 'react'
import { StockGraph, UserNameForm, StockDD } from '../components/index.js'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchStock } from '../store/actions/action.js'

// const stockId = process.env.REACT_APP_STOCK_API 
const stockId = "a3973ebb793d184e80baa05ca8d7bb33"

const Stock = () => {
  const name = useSelector(state => state.stocks.name)
  const stockChartXValues = useSelector(state => state.stocks.stockChartXValues)
  const stockChartYValues = useSelector(state => state.stocks.stockChartYValues)
  const allSymbols = useSelector(state => state.stocks.allSymbols)
  const allNames = useSelector(state => state.stocks.allNames)
  const num = useSelector(state => state.stocks.num)
  const url = useSelector(state => state.stocks.url)
  const isLoading = useSelector(state => state.stocks.isLoading)
  const Error = useSelector(state => state.stocks.Error)

  const watchlist = useSelector(state => state.watchs.watchlist)
  const watchlistYValues = useSelector(state => state.watchs.watchlistYValues)
  const count = useSelector(state => state.watchs.count)
  const countTheCount = useSelector(state => state.watchs.countTheCount)

  const dispatch = useDispatch()

  useEffect(() => {
    if (countTheCount !== count) {
      fetchWatchlist()
      dispatch({ type: 'countTheCount/set', payload: count })
    }
  }, [count])

  useEffect(() => {
    if (allSymbols.length) {
      let theNumber = num ? num : 0
      dispatch(fetchStock(allSymbols[theNumber]))
      dispatch({ type: 'url/set', payload: `detailStock/${allSymbols[num]}` })
    }
  }, [allSymbols, num])

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
    // let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${watchlist[hitung]}`
    // let theAPI = `http://localhost:3000/${watchlist[hitung]}`
    let theAPI = `https://be-cuan-able.herokuapp.com/${watchlist[hitung]}`

    console.log(theAPI)
    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartYValuesTemp.push(el.open)
        });

        dispatch({ type: 'watchYValue/set', payload: stockChartYValuesTemp })
      })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="flex-col text-center items-center">
      <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      <br />
      <Link to="/">
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Home
        </button>
      </Link>
      <span> - </span>
      <Link to="/watch">
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Watchlist
        </button>
      </Link>
      <br /><br />
      <p className="">Welcome, <strong>{name ? name : 'Good People'}</strong></p>
      <UserNameForm theName={(name) => dispatch({ type: 'name/set', payload: name })} />
      <br />
      <StockDD allName={allNames} theNum={(num) => dispatch({ type: 'num/set', payload: num })} />
      <br />
      <button onClick={addWatchlist} className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
        Add {url ? `${allNames[num]}` : ''} to Your Watchlist
      </button>
      <br /><br />
      {
        Error && <p>{Error}</p>
      }
      {
        isLoading ? <p>"loading..."</p> :
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
