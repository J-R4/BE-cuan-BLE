import React, { useState, useEffect } from 'react'
import { StockGraph, UserNameForm, StockDD } from '../components/index.js'
import { allStock } from '../allStock.js'

const stockId = process.env.REACT_APP_STOCK_API

const Stock = () => {
  const [name, setName] = useState('')
  const [stockChartXValues, setXValues] = useState([])
  const [stockChartYValues, setYValues] = useState([])

  const [closeStockChartYValues, setCloseYValues] = useState([])

  const [highStockChartYValues, setHighYValues] = useState([])

  const [lowStockChartYValues, setLowYValues] = useState([])

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
    let closeStockChartYValuesTemp = []
    let highStockChartYValuesTemp = []
    let lowStockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${allSymbols[theNumber]}`

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

        setXValues(stockChartXValuesTemp)
        setYValues(stockChartYValuesTemp)
        setCloseYValues(closeStockChartYValuesTemp)
        setHighYValues(highStockChartYValuesTemp)
        setLowYValues(lowStockChartYValuesTemp)
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
      <h1>Open Detail</h1>
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={stockChartYValues}>
        </StockGraph>
      }
      <h1>Close Detail</h1>
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={closeStockChartYValues}>
        </StockGraph>
      }
      <h1>High Detail</h1>
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={highStockChartYValues}>
        </StockGraph>
      }<h1>Low Detail</h1>
      {
        <StockGraph name={allNames[num]}
          xValue={stockChartXValues}
          yValue={lowStockChartYValues}>
        </StockGraph>
      }
    </>
  )
}

export default Stock;
