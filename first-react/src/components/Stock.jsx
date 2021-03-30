import React, { useState, useEffect } from 'react'
import StockGraph from './StockGraph.jsx'
import UserNameForm from './UserNameForm.jsx'

const stockId = process.env.REACT_APP_STOCK_API

const Stock = () => {
  const [name, setName] = useState('')
  const [stockChartXValues, setXValues] = useState([])
  const [stockChartYValues, setYValues] = useState([])
  const [stockSymbols, setSymbol] = useState('AAPL')
  const [stockNames, setStockName] = useState('Apple Inc')

  useEffect(() => {
    fetchStock()
  }, [])

  const fetchStock = () => {
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${stockSymbols}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
          stockChartYValuesTemp.push(el.open)
        });

        setXValues(stockChartXValuesTemp)
        setYValues(stockChartYValuesTemp)
      })

      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h1>Cuan-Cuan Market</h1>
      <p>Welcome, {name ? name : 'Good People'}</p>
      <UserNameForm theName={(name) => setName(name)} />
      {
        <StockGraph name={stockNames}
          xValue={stockChartXValues}
          yValue={stockChartYValues}>
        </StockGraph>
      }
    </>
  )
}

export default Stock;
