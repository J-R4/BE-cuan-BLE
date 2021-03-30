import React from 'react'
import Plot from 'react-plotly.js'

const StockGraph = (props) => {

  const { xValue,
    yValue,
    name } = props

  return (
    <div>
      <Plot
        data={[
          {
            x: xValue,
            y: yValue,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 720, height: 440, title: name }}
      />
    </div>
  )
}

export default StockGraph