import React, { Component } from "react";
import axios from "axios";

const PostCommentContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_COMMENT":
            return {
                ...state,
                comments: [...state.comments, action.payload],
              };
       
        default:
            return state;
    }
};

export class PostCommentProvider extends Component {
    state = {
        comments: [],
        dispatch: (action) => {
          this.setState((state) => reducer(state, action));
        },
      };
      async componentDidMount() {
        const url = "http://localhost:8080/postComments/getAll";
        const response = await axios.get(url);
        this.setState({ comments: response.data });
      }

      render() {
        return (
          <PostCommentContext.Provider value={this.state}>
            {this.props.children}
          </PostCommentContext.Provider>
        );
      }
}
const PostCommentConsumer = PostCommentContext.Consumer;

export default PostCommentConsumer;