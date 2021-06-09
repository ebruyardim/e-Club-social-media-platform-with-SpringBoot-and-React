import React, { Component } from "react";
import axios from "axios";

const PostContext = React.createContext();
// Provider, Consumer

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, action.payload],
              };
        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter((post) => action.payload !== post.id),
              };
        case "UPDATE_POST":
            return {
                ...state,
                  posts: state.posts.filter((post) => action.payload !== post.id),
              };
        default:
            return state;
    }
};

export class PostProvider extends Component {
    state = {
        posts: [],
        dispatch: (action) => {
          this.setState((state) => reducer(state, action));
        },
      };
      async componentDidMount() {
        const url = "http://localhost:8080/subclubPosts/getAll";
        const response = await axios.get(url);
        this.setState({ posts: response.data });
      }

      render() {
        return (
          <PostContext.Provider value={this.state}>
            {this.props.children}
          </PostContext.Provider>
        );
      }
}
const PostConsumer = PostContext.Consumer;

export default PostConsumer;