import React, { useState, useEffect } from 'react'
import StockGraph from './StockGraph.jsx'
import UserNameForm from './UserNameForm.jsx'
import StockDD from './StockDD.jsx'
import { allStock } from '../allStock.js'

const stockId = process.env.REACT_APP_STOCK_API

const Stock = () => {
  const [name, setName] = useState('')
  const [stockChartXValues, setXValues] = useState([])
  const [stockChartYValues, setYValues] = useState([])
  const [allSymbols, setAllSymbol] = useState([])
  const [allNames, setAllStockName] = useState([])
  const [num, setNum] = useState(0)

  useEffect(() => {
    fetchAllStock()
    fetchStock()
  }, [num])

  const fetchAllStock = () => {
    let allSt = []
    let allName = []

    allStock.forEach(el => {
      allSt.push(el.symbol)
      allName.push(el.name)
    })

    setAllSymbol(allSt)
    setAllStockName(allName)
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

        setXValues(stockChartXValuesTemp)
        setYValues(stockChartYValuesTemp)
      })

      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <img className="object-center md:object-top mx-auto" src="../CUAN.png" alt="CM Logo" width="200px" height="500px" />
      <p>Welcome, {name ? name : 'Good People'}</p>
      <UserNameForm theName={(name) => setName(name)} />
      <StockDD allName={allNames} theNum={(num) => setNum(num)} />
      <br />
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={stockChartYValues}>
        </StockGraph>
      }
    </>
  )
}

export default Stock;
