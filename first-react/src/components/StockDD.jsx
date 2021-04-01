import React, { useState } from 'react'

const StockDD = (props) => {

  const [num, setNum] = useState(0)

  const formOnSubmit = (event) => {
    event.preventDefault()
    props.theNum(num)
  }

  const handleOnChange = (event) => {
    setNum(event.target.value)
  }

  const {
    allName
  } = props

  return (
    <>
      <label id="listbox-label" className="block text-sm font-medium text-gray-700">
        Select Stock
      </label>

      <form onSubmit={(event) => formOnSubmit(event)} action="">
        <select className="" onChange={handleOnChange}>
          {
            allName.map((name, i) => {
              return <option value={i} key={i}>{name}</option>
            })
          }
        </select>
        <button className='py-0 px-1 font-semibold shadow-md text-white bg-yellow-500 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Select
        </button>
      </form>
    </>
  )
}

export default StockDD