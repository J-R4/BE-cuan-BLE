import React, { useState } from 'react'

const UserNameForm = (props) => {

  const [nama, setNameChild] = useState('')

  const formOnSubmit = (event) => {
    event.preventDefault()
    props.theName(nama)// lempar ke parent
    setNameChild('')
  }

  const handleOnChange = (event) => {
    setNameChild(event.target.value)
  }

  return (
    <>
      <form onSubmit={(event) => formOnSubmit(event)} action="">
        <input
          className='border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 hover:bg-yellow-100 focus:border-transparent ...'
          value={nama}
          type="text"
          placeholder="enter your name"
          name="name"
          onChange={handleOnChange}
        />
        <button className='py-1 px-2 font-semibold rounded-lg shadow-md text-white bg-yellow-600 hover:bg-yellow-700 transform hover:scale-110 motion-reduce:transform-none'>
          Submit
        </button>
      </form>
    </>
  )
}

export default UserNameForm