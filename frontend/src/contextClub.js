import React, { Component } from "react";
import axios from "axios";

const ClubContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CLUB":
      return {
        ...state,
        clubs: [...state.clubs, action.payload],
      };

    case "DELETE_CLUB":
      return {
        ...state,
        clubs: state.clubs.filter((club) => action.payload !== club.id),
      };

    case "UPDATE_CLUB_INFO":
      for (var key in state.clubs) {
        if (state.clubs.hasOwnProperty(key)) {
          if (
            state.clubs[key]["id"].toString() ===
            action.payload.club_id.toString()
          ) {
            state.clubs[key]["clubInfo"] = action.payload.clubInfo;
          }
        }
      }
      return {
        ...state,
        
      };

    case "ADD_SUBCLUB":
      for (var key in state.clubs) {
        if (state.clubs.hasOwnProperty(key)) {
          if (
            state.clubs[key]["id"].toString() ===
            action.payload.club_id.toString()
          ) {
            var dict = {};
            dict["id"] = action.payload.id;
            dict["lastActivityTime"] = action.payload.lastActivityTime;
            dict["rate"] = action.payload.rate;
            dict["adminId"] = action.payload.adminId;
            dict["name"] = action.payload.name;
            if (
              !state.clubs[key]["subClubs"].find(
                (o) => o["id"].toString() === dict.id.toString()
              )
            ) {
              state.clubs[key]["subClubs"].push(dict);
            }
          }
        }
      }
      return {
        ...state,
      };

    case "DELETE_SUBCLUB":
      for (var key in state.clubs) {
        if (state.clubs.hasOwnProperty(key)) {
          state.clubs[key]["subClubs"] = state.clubs[key]["subClubs"].filter(
            (subClub) => action.payload.toString() !== subClub.id.toString()
          );
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};

export class ClubProvider extends Component {
  state = {
    clubs: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };
  async componentDidMount() {
    const url = "http://localhost:8080/clubs/all";
    const response = await axios.get(url);
    this.setState({ clubs: response.data });
  }

  render() {
    return (
      <ClubContext.Provider value={this.state}>
        {this.props.children}
      </ClubContext.Provider>
    );
  }
}
const ClubConsumer = ClubContext.Consumer;

export default ClubConsumer;
