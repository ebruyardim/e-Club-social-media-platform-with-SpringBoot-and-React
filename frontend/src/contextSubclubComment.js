import React, { Component } from "react";
import axios from "axios";

const SubclubCommentContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_SUBCLUBCOMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload],
              };
       
        default:
            return state;
    }
};

export class SubclubCommentProvider extends Component {
    state = {
        subclubComments: [],
        dispatch: (action) => {
          this.setState((state) => reducer(state, action));
        },
      };
      async componentDidMount() {
        const url = "http://localhost:8080/subclubComments/getAll";
        const response = await axios.get(url);
        this.setState({ comments: response.data });
      }

      render() {
        return (
          <SubclubCommentContext.Provider value={this.state}>
            {this.props.children}
          </SubclubCommentContext.Provider>
        );
      }
}
const SubclubCommentConsumer = SubclubCommentContext.Consumer;

export default SubclubCommentConsumer;