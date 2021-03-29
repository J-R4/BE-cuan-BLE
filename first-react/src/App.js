// import logo from './logo.svg';
import React from 'react'
import Plot from 'react-plotly.js'

import './App.css';

const stockId = process.env.REACT_APP_STOCK_API

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      username: 'Jojo Keren',
      users: [
        {
        name: 'jojo',
        age: '20'
        },
        {
        name: 'jeje',
        age: '22'
        }
      ]
    }
  }

  addUser = ( user ) => {
    let newData = this.state.users.concat(user) // concat nambahin di data terakhir di arraynya dan mereturn array baru
    this.setState({
      ...this.state,
      users: newData
    })
  }

  getDataFromServer = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          users: res
        })
      })
      .catch(err => console.log(err))
  }

  getStockData = () => {
    fetch(`http://api.marketstack.com/v1/eod?access_key=${stockId}&symbols=AAPL`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        console.log(stockId,'ini dari then')
      })
      .catch((err) => {
        console.log(err)
        console.log(stockId)
      })
  }

  componentDidMount() { // created
    this.getDataFromServer()
    this.getStockData()
  }

  render() {
    const {username} = this.state
    return (
      <div>
        <h1 className="card">helolo</h1>
        <h3>{username}</h3>
        <ul>
          <li>Username - email</li>
          {
            // users.map(user => {
              // return <UserList user={user}></UserList>
              // return <li>{user.name} - {user.age}</li>
            // })
          }
        </ul>
        {/* { JSON.stringify(users)} */}
        {/* <UserForm tambahUser={this.addUser}></UserForm> */}
      </div>
    )
    // return React.createElement("h1", {}, "hello world, hellow react!")
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
