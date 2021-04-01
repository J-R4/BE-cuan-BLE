import React from 'react'
import { StockGraph } from '../components/index.js'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Watch = () => {
  const name = useSelector(state => state.name)
  const stockChartXValues = useSelector(state => state.stockChartXValues)
  const watchlistYValues = useSelector(state => state.watchlistYValues)
  const watchUrl = useSelector(state => state.watchUrl)
  const watchlist = useSelector(state => state.watchlist)
  const watchNames = useSelector(state => state.watchNames)
  return (
    <div className="flex-col text-center items-center">
      <Link to="/">
        <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      </Link>
      <br />
      {
        watchlist.length ? <p className="">Here is your WatchList, <strong>{name ? name : 'Good People'}</strong> <br /> <i>HAPPY TRADING :)</i></p> : <p>You doesn't have any watchlist yet, add it on the stocklist :) <i>(press the logo to go back)</i></p>
      }
      <br />
      <div className="grid h-4/5 grid-cols-2 gap-4">
        {
          watchlist.map((wl, i) => {
            return <div>
              <StockGraph key={i} name={watchNames[i]}
                xValue={stockChartXValues}
                yValue={watchlistYValues[i]}>
              </StockGraph>

              <Link key={i + (2000 / wl)} to={watchUrl[i]}>
                <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
                  {
                    watchUrl[i] ? `Detail of ${watchNames[i]} Stock` : `${watchNames[i]}`
                  }
                </button>
              </Link>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Watch;
