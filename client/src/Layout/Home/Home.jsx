import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import { GridLoader } from 'react-spinners';
// Components
import User from "../../components/User/User";
import SearchUsers from "../../components/SearchUsers/SearchUsers";

class Home extends Component {
  state = {
    data: null,
    allUsers: null,
    error: ""
  };

  async componentDidMount() {
    try {
      const users = await axios("/api/users/");
      this.setState({ data: users.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  removeUser = async id => {
    try {
      const userRemoved = await axios.delete(`/api/users/${id}`);
      const users = await axios("/api/users/");
      this.setState({ data: users.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  searchUsers = async username => {
    let allUsers = [...this.state.data.users];
    if (this.state.allUsers === null) this.setState({ allUsers });

    let users = this.state.data.users.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (users.length > 0) this.setState({ data: { users } });

    if (username.trim() === "")
      this.setState({ data: { users: this.state.allUsers } });
  };

  render() {
    let users;

    if (this.state.data)
      users =
        this.state.data.users &&
        this.state.data.users.map(user => (
          <User key={user._id} {...user} removeUser={this.removeUser} />
        ));
    else return <div className="Spinner-Wrapper"> <GridLoader color={'#333'} /> </div>;

    if (this.state.error) return <h1>{this.state.error}</h1>;
    if (this.state.data !== null)
      if (!this.state.data.users.length)
        return <h1 className="No-Users">No users!</h1>;

    return (
      <div className="Table-Wrapper">
        <h1>Users:</h1>
        <SearchUsers searchUsers={this.searchUsers} />
        <table className="Table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      </div>
    );
  }
}

export default Home;
