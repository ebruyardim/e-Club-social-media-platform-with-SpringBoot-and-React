import React, { Component } from "react";
import axios from "axios";

const EnrolledClubContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ENROLLED_CLUB":
      return {
        ...state,
      };

    case "DELETE_ENROLLED_CLUB":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export class EnrolledClubProvider extends Component {
  state = {
    enrolled_clubs: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };
  async componentDidMount() {
    const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));
    if (
      Number.isNaN(parseInt(JSON.parse(localStorage.getItem("userId")))) ===
      false
    ) {
      const url =
        "http://localhost:8080/member-subclubs/getByMember/" +
        userIdInfo.toString();
      const response = await axios.get(url);
      this.setState({ enrolled_clubs: response.data });
    }
  }

  render() {
    return (
      <EnrolledClubContext.Provider value={this.state}>
        {this.props.children}
        {console.log(this.state.enrolled_clubs)}
      </EnrolledClubContext.Provider>
    );
  }
}
const EnrolledClubConsumer = EnrolledClubContext.Consumer;

export default EnrolledClubConsumer;
