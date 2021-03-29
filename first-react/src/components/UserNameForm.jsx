import React from 'react'

class UserNameForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
    }
  }

  formOnSubmit(event) {
    event.preventDefault()
    this.props.theName(this.state.name)// lempar ke parent
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <>
        <form onSubmit={(event) => this.formOnSubmit(event)} action="">
          <input
            value={this.state.name}
            type="text"
            placeholder="enter your name"
            name="name"
            onChange={this.handleOnChange}
          />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default UserNameForm