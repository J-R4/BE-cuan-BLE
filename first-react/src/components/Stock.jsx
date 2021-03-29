import React from 'react'
import StockGraph from './StockGraph.jsx'
import UserNameForm from './UserNameForm.jsx'

const stockId = process.env.REACT_APP_STOCK_API

class Stock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      stockChartXValues: [],
      stockChartYValues: [],
      // stockSymbols: [],
      stockSymbols: 'AAPL',
      stockNames: 'Apple Inc'
      // stockNames: []
    }
  }

  componentDidMount() { // created
    this.fetchStock()
  }

  fetchStock() {
    let stockChartXValuesTemp = []
    let stockChartYValuesTemp = []
    let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${this.state.stockSymbols}`

    fetch(theAPI)
      .then(res => res.json())
      .then(res => {

        (res.data).forEach(el => {
          stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
          stockChartYValuesTemp.push(el.open)
        });

        this.setState({
          stockChartXValues: stockChartXValuesTemp,
          stockChartYValues: stockChartYValuesTemp,
        })
      })

      .catch((err) => {
        console.log(err)
      })
  }

  // fetchStock3() {
  //   let stockChartXValuesTemp = []
  //   let stockChartYValuesTemp = []
  //   let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${this.state.stockSymbols[2]}`

  //   fetch(theAPI)
  //     .then(res => res.json())
  //     .then(res => {

  //       (res.data).forEach(el => {
  //         stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
  //         stockChartYValuesTemp.push(el.open)
  //       });

  //       this.setState({
  //         stockChartXValues3: stockChartXValuesTemp,
  //         stockChartYValues3: stockChartYValuesTemp,
  //       })
  //     })

  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // fetchStock() {
  //   let allStock = `http://api.marketstack.com/v1/tickers?access_key=${stockId}`
  //   let stockChartXValuesTemp = []
  //   let allStockChartXValuesTemp = []
  //   let stockChartYValuesTemp = []
  //   let allStockChartYValuesTemp = []
  //   let stockSymbolsTemp = []
  //   let stockNamesTemp = []

  //   fetch(allStock)
  //     .then(res => res.json())
  //     .then(res => {
  //       (res.data).forEach(el => {
  //         stockSymbolsTemp.push(el.symbol)
  //         stockNamesTemp.push(el.name)
  //       })

  //       this.setState({
  //         stockSymbols: stockSymbolsTemp,
  //         stockNames: stockNamesTemp
  //       })

  //       for (let i = 0; i < res.pagination.limit; i++) {
  //         let theAPI = `http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=${stockSymbolsTemp[i]}`

  //         fetch(theAPI)
  //           .then(res => res.json())
  //           .then(res => {

  //             (res.data).forEach(el => {
  //               stockChartXValuesTemp.push((el.date.split('').splice(0, 10).join('')))
  //               stockChartYValuesTemp.push(el.open)
  //             });

  //             allStockChartXValuesTemp.push(stockChartXValuesTemp)
  //             allStockChartYValuesTemp.push(stockChartYValuesTemp)

  //             stockChartXValuesTemp = []
  //             stockChartYValuesTemp = []

  //           })

  //           .catch((err) => {
  //             console.log(err)
  //           })
  //       }

  //       this.setState({
  //         stockChartXValues: allStockChartXValuesTemp,
  //         stockChartYValues: allStockChartYValuesTemp,
  //       })

  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  changeName = (newName) => {
    this.setState({
      name: newName
    })
  }

  render() {
    const { name, stockChartXValues,
      stockChartYValues,
      // stockSymbols,
      stockNames } = this.state
    return (
      <>
        <h1>Cuan-Cuan Market</h1>
        <p>Welcome, {name ? name : 'Good People'}</p>
        <UserNameForm theName={this.changeName} />
        {/* {
          stockSymbols.map((st, i) => {
            return <StockGraph symbol={st} name={stockNames[i]}
              xValue={stockChartXValues[i]}
              yValue={stockChartYValues[i]}>
            </StockGraph>
          })
        } */}
        {
          <StockGraph name={stockNames}
            xValue={stockChartXValues}
            yValue={stockChartYValues}>
          </StockGraph>
        }
      </>
    )
  }
}

export default Stock;
