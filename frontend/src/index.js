import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contextUser";
import { ClubProvider } from "./contextClub";
import { EnrolledClubProvider } from "./contextEnrolledClubs";
import { PostProvider } from "./contextPost";
import { PostCommentProvider } from "./contextPostComment";
import { SubclubCommentProvider } from "./contextSubclubComment";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ClubProvider>
        <PostProvider>
        <PostCommentProvider>
          <SubclubCommentProvider>
        <EnrolledClubProvider>
          <App />
        </EnrolledClubProvider>
        </SubclubCommentProvider>
        </PostCommentProvider>
        </PostProvider>
      </ClubProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
