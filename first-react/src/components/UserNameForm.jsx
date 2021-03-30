import React, { useState } from 'react'

const UserNameForm = (props) => {

  const [nama, setNameChild] = useState('')

  const formOnSubmit = (event) => {
    event.preventDefault()
    props.theName(nama)// lempar ke parent
    setNameChild('')
  }

  const handleOnChange = (event) => {
    console.log(event.target.value)
    setNameChild(event.target.value)
  }

  return (
    <>
      <form onSubmit={(event) => formOnSubmit(event)} action="">
        <input
          value={nama}
          type="text"
          placeholder="enter your name"
          name="name"
          onChange={handleOnChange}
        />
        <button>Submit</button>
      </form>
    </>
  )
}

export default UserNameForm