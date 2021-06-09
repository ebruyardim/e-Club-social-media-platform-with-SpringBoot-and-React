import React, { useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Background from "../../images/background/beige-background.jpg";
import {
  Button,
  makeStyles,
  Input,
  InputLabel,
  Avatar,
  Card,
  CardContent,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Person } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  purple,
  orange,
  pink,
  red,
  indigo,
  cyan,
  green,
  brown,
  teal,
  lime,
} from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import auth from "../../auth";
import UserConsumer from "../../contextUser";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "1800vh",
  },
}));

export function PrivateChat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [clientRef, setClientRef] = useState();
  const [count, setCount] = useState(0);
  const [messageFromName, setMessageFromName] = useState("");
  const [messageToName, setMessageToName] = useState("");
  const history = useHistory();
  const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));
  const messageToUserIdInfo = parseInt(
    JSON.parse(localStorage.getItem("messageToUserIdInfo"))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const color_list = [
    teal[200],
    pink[100],
    orange[100],
    red[300],
    cyan[200],
    green[100],
    brown[200],
    indigo[200],
    lime[300],
    purple[400],
  ];
  const onConnected = () => {
    console.log("connected");
  };

  const disConnected = () => {
    console.log("disConnected");
  };

  const onMessageReceived = (msg) => {
    setMessages([...messages, msg]);
    console.log("received!");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (count === 0) {
      const url =
        "http://localhost:8080/getPrivateMessages/" +
        userIdInfo +
        "/" +
        messageToUserIdInfo;
      axios.get(url).then((response) => {
        console.log(response.data);
        response.data.map((message) => {
          setMessages((messages) => [...messages, message]);
        });
        setCount(1);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("subclubId");
    localStorage.removeItem("messageToUserIdInfo");
    const url = "http://localhost:8080/member/logout/" + userIdInfo.toString();
    axios.get(url).then(console.log(url));
    localStorage.removeItem("userId");
    auth.isAuthenticated(() => {});
    history.push("/");
  };

  const redirectProfile = () => {
    localStorage.removeItem("subclubId");
    localStorage.removeItem("messageToUserIdInfo");
    history.push("/profile");
  };

  const [newMessageType, setNewMessageType] = useState({
    newMessageType: "",
  });

  const handleNewMessage = (prop) => (event) => {
    setNewMessageType({ ...newMessageType, [prop]: event.target.value });
  };

  const sendMessage = () => {
    let newMessage = {
      content: newMessageType.newMessageType,
      senderId: userIdInfo, //user
      receiverId: messageToUserIdInfo,
    };
    try {
      clientRef.sendMessage("/app/chat", JSON.stringify(newMessage)); // receiver
      setMessages((messages) => [...messages, newMessage]);
      return true;
    } catch (e) {
      console.log("ERROR");
      return false;
    }
  };
  const showMessages = () => {
    return messages.map((message) => {
      //sender: {message.senderId} message: {message.content}
      //console.log(message.senderId, message.content);
    });
  };

  return (
    <>
      <div
        className={classes.container}
        style={{
          paddingTop: "0px",
          marginTop: "0",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <SockJsClient
          url="http://localhost:8080/lovelace"
          topics={["/topic/messages/" + userIdInfo]} //user
          onConnect={onConnected}
          onDisconnect={disConnected}
          onMessage={onMessageReceived}
          ref={(client) => {
            setClientRef(client);
          }}
        />
        <div>
          <UserConsumer>
            {(value) => {
              const { users, dispatch } = value;

              return (
                <div>
                  {users.map((user) => {
                    if (user.id === userIdInfo) {
                      setMessageFromName(user.username);
                    }
                    if (user.id === messageToUserIdInfo) {
                      setMessageToName(user.username);
                    }
                  })}
                </div>
              );
            }}
          </UserConsumer>
        </div>

        {messages.map((message) => {
          if (message.senderId === userIdInfo) {
            return (
              <div>
                <h6
                  style={{
                    fontFamily: "Garamond",
                    padding: 12,
                    paddingLeft: 200,
                    justifyContent: "center",
                    color: "#474747",
                  }}
                >
                  <Avatar
                    alt="user-photo"
                    style={{
                      margin: "auto",
                      width: 30,
                      height: 30,
                      backgroundColor: color_list[userIdInfo % 10],
                    }}
                  >
                    <Person />
                  </Avatar>
                  {messageFromName} {message.content}{" "}
                </h6>
              </div>
            );
          } else {
            return (
              <div>
                <h6
                  style={{
                    fontFamily: "Garamond",
                    padding: 12,
                    paddingRight: 200,
                    color: "#7C756D",
                  }}
                >
                  <Avatar
                    alt="user-photo"
                    style={{
                      margin: "auto",

                      width: 30,
                      height: 30,
                      backgroundColor: color_list[messageToUserIdInfo % 10],
                    }}
                  >
                    <Person />
                  </Avatar>
                  {messageToName} {message.content}{" "}
                </h6>
              </div>
            );
          }
        })}
        <InputLabel
          style={{
            fontFamily: "Garamond",
            color: "#925412",
          }}
        >
          New Message
        </InputLabel>
        <Input
          id="newMessageType"
          value={newMessageType.newMessageType}
          onChange={handleNewMessage("newMessageType")}
        />
        <br />
        <Button
          style={{
            fontFamily: "Garamond",
            color: "#925412",
          }}
          onClick={sendMessage}
        >
          <h6>Send message</h6>
        </Button>
      </div>
    </>
  );
}
