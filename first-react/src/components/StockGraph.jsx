import React from 'react'
import Plot from 'react-plotly.js'

class StockGraph extends React.Component {

  render() {
    const { xValue,
      yValue,
      name } = this.props
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
}

export default StockGraph