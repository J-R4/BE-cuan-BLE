import React from 'react'
import { StockGraph } from '../components/index.js'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Watch = () => {
  const name = useSelector(state => state.stocks.name)
  const stockChartXValues = useSelector(state => state.stocks.stockChartXValues)

  const watchlistYValues = useSelector(state => state.watchs.watchlistYValues)
  const watchUrl = useSelector(state => state.watchs.watchUrl)
  const watchlist = useSelector(state => state.watchs.watchlist)
  const watchNames = useSelector(state => state.watchs.watchNames)
  const isLoading = useSelector(state => state.stocks.isLoading)
  const Error = useSelector(state => state.stocks.Error)

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
      <Link to="/stock">
        <button className='py-1 px-2 font-semibold shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Stocklist
        </button>
      </Link>
      <br /><br />
      {
        watchlist.length ? <p className="">Here is your WatchList, <strong>{name ? name : 'Good People'}</strong> <br /> <i>HAPPY TRADING :)</i></p> : <p>You doesn't have any watchlist yet, add it on the stocklist :)</p>
      }
      <br />
      {
        Error && <p>{Error}</p>
      }
      <div className="grid h-4/5 grid-cols-2 gap-4">
        {
          watchlist.map((wl, i) => {
            return <div>
              {isLoading ? <p>"loading..."</p> :
                <StockGraph key={i} name={watchNames[i]}
                  xValue={stockChartXValues}
                  yValue={watchlistYValues[i]}>
                </StockGraph>}

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
