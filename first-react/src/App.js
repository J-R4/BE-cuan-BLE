import React from 'react'
import Stock from './components/Stock.jsx'
import ReactDOM from 'react-dom'
import { Windmill } from '@windmill/react-ui'

import './App.css';

function App() {
  return (
    <div className="App container">
      <Stock/>
    </div>
  );
}

ReactDOM.render(
  <Windmill>
    <App />
  </Windmill>,
  document.getElementById('root')
)
export default App;
