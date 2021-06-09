import React, { Component } from "react";
import axios from "axios";

const UserContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => action.payload !== user.id)
      }
    default:
      return state;
  }
};

export class UserProvider extends Component {
  state = {
    users: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  async componentDidMount() {
    const url = "http://localhost:8080/member/all";
    const response = await axios.get(url)
    this.setState({ users: response.data });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {console.log(JSON.stringify(this.state.users, null, 4))}
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
const UserConsumer = UserContext.Consumer;

export default UserConsumer;
