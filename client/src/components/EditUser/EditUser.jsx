import React, { Component } from "react";
import './EditUser.css';
import axios from "axios";
import { withRouter } from 'react-router'

class EditUser extends Component {
  state = {
    id: '',
    name: "",
    genre: "",
    age: "",
    response: ""
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  async componentDidMount() {
    try {
    let search =  this.props.location.search,
      id = search.substring(1, search.length);
    const updateUser = await axios(`/api/users/${id}`);
    const { name, genre, age } = updateUser.data.user;
    this.setState({ id, name, genre, age  });
    } catch (err) {
      this.setState({ response: "User not found!" })
    }
  };

  updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.put(`/api/users/${this.state.id}`, {
        name: this.refs.name.value,
        age: Number(this.refs.age.value),
        genre: this.refs.genre.value
      });
      this.setState({response: user.data.message });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };

  render() {
    if (this.state.response === "User not found!")
      return <h1>User not found!</h1>
    return (
      <div className="Edit-User-Wrapper">
        <h1>Edit page</h1>
        <form onSubmit={this.updateUserHandler}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name..."
            value={ this.state.name }
            name="name"
            onChange={this.onChangeHandler}
            ref="name"
            className="Edit-User-Input"
            id="name"
          />
          <label htmlFor="genre">Genre: <b>(must be Male or Female)</b></label>
          <input
            type="text"
            placeholder="Genre..."
            value={ this.state.genre }
            name="genre"
            onChange={this.onChangeHandler}
            ref="genre"
            className="Edit-User-Input"
            id="genre"
          />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            placeholder="Age"
            value={ this.state.age }
            name="age"
            min="1"
            max="120"
            onChange={this.onChangeHandler}
            ref="age"
            className="Edit-User-Input"
            id="age"
          />
          <button type="submit" className="Edit-User-Submit fa fa-pencil"></button>
        </form>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default withRouter(EditUser);
