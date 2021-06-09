import React, { useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SubclubChat.css";
import useSound from "use-sound";
import Logo from "../../images/logo/logo_transparent.png";
import Background from "../../images/background/beige-background.jpg";
import PersonIcon from "@material-ui/icons/Person";
import Art from "../../images/serviceThumbnails/art.jpeg";
import Technology from "../../images/serviceThumbnails/technology.jpeg";
import Travel from "../../images/serviceThumbnails/travel.jpeg";
import Book from "../../images/serviceThumbnails/book.jpeg";
import Dance from "../../images/serviceThumbnails/dance.jpeg";
import Music from "../../images/serviceThumbnails/music.jpeg";
import CinemaTheatre from "../../images/serviceThumbnails/cinema-theatre.jpeg";
import Sports from "../../images/serviceThumbnails/sport.jpeg";
import Health from "../../images/serviceThumbnails/health.jpeg";
import FashionBeauty from "../../images/serviceThumbnails/fashion-beauty.jpeg";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Person, ExitToApp } from "@material-ui/icons";
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
import {
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  makeStyles,

} from "@material-ui/core";
import auth from "../../auth";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  iconText: {
    paddingLeft: 10,
    paddingTop: 80,
    paddingBottom: 10,
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "1400vh",
  },
}));

const BoopButton = () => {
  const url = "https://www.soundjay.com/buttons/sounds/button-09a.mp3";

  const [play] = useSound(url);
  React.useEffect(() => {
    setTimeout(() => {
      play();
    }, 5);
  }, [play]);

  return (
    <button className="btn btn-primary" onClick={play}>
      Send message
    </button>
  );
};

export default function SubclubChat() {
  const [enrolled_club_names, setEnrolled_club_names] = useState([]);
  const [online_subclub, setOnline_subclub] = useState();
  const [enrolled_club_ids, setEnrolled_club_ids] = useState([]);
  const [messages, setMessages] = useState([]);
  const [clientRef, setClientRef] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userId")));
  const [content, setContent] = useState("");
  const [chatSession, setChatSession] = useState("");
  const [members, setMembers] = useState([]);
  const classes = useStyles();
  let dict = {};
  const [IdDict, setIdDict] = useState({});
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  var check = true;

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
  const history = useHistory();

  useEffect(() => {
    const url4 = "http://localhost:8080/member/all/";

    axios.get(url4).then((response) => {
      // eslint-disable-next-line no-lone-blocks
      {
        response.data.map((member) => {
          setMembers((members) => [...members, member]);
          dict[member.id] = member.username;
        });
        setIdDict((IdDict) => dict);
      }
    });
    if (!IdDict.isEmpty) {
      localStorage.setItem("Members", JSON.stringify(IdDict));
    }

    const url =
      "http://localhost:8080/member/getMemberDetails/" + user.toString();
    axios.get(url).then((response) => {
      response.data["subclubs"].map((subclub) => {
        if (subclub.startsWith("id: ")) {
          if (!enrolled_club_ids.find((o) => o === subclub.split(" ")[1])) {
            setEnrolled_club_ids((enrolled_club_ids) => [
              ...enrolled_club_ids,
              subclub.split(" ")[1],
            ]);
          }
        } else if (!subclub.startsWith("ban") && !subclub.startsWith("is")) {
          if (!enrolled_club_names.find((o) => o === subclub.toString())) {
            setEnrolled_club_names((enrolled_club_names) => [
              ...enrolled_club_names,
              subclub,
            ]);
          }
        }
      });
    });
  }, []);

  const onConnected = () => {
    console.log("connected", user);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const disConnected = () => {
    console.log("disConnected");
  };

  const onMessageReceived = (msg) => {
    if (msg.senderId !== user) {
      setMessages([...messages, msg]);
    }
    console.log("received!");
  };
  const redirectProfile = () => {
    history.push("/profile");
  };

  const handleLogout = () => {
    const url = "http://localhost:8080/member/logout/" + user.toString();
    axios.get(url).then(console.log(url));
    localStorage.removeItem("userId");
    auth.isAuthenticated(() => {});
    history.push("/");
  };

  const OnlineSubclub = (current) => {
    let current_subclub_id = enrolled_club_ids[current];
    setOnline_subclub(current_subclub_id);

    const url2 =
      "http://localhost:8080/getChatId/" + current_subclub_id.toString();
    axios.get(url2).then((response) => {
      setChatSession(response.data);
      let mychatSesssion = response.data;
      console.log("checkk:", mychatSesssion, current_subclub_id);
      const url3 =
        "http://localhost:8080/getMessages/" + mychatSesssion.toString();

      axios.get(url3).then((res) => {
        setMessages(res.data);
      });

      //eskii
    });

    console.log("subclubid:", current_subclub_id, "chatid:", chatSession);
  };

  const SearchCheck = (club) => {
    if (club.startsWith(search)) return true;
    else return false;
  };
  const showMessages = () => {
    var today = new Date(),
      timee =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return messages.map((message) => {
      var time;
      if (message.datetime) {
        time = message.datetime.split(" ")[1];
      } else {
        time = timee;
      }

      let senderName = "";
      if (!IdDict.isEmpty) {
        senderName = IdDict[message.senderId];
        console.log(senderName);
      }

      if (message.senderId === user) {
        return (
          <p>
            <div className="chat-message-right pb-4">
              <div>
                <div className="text-muted small text-nowrap mt-2">{time}</div>
              </div>
              <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div className="font-weight-bold mb-1">{senderName}</div>
                {message.content}
              </div>
            </div>
          </p>
        );
      } else {
        return (
          <p>
            <div className="chat-message-left pb-4">
              <div>
                <div className="text-muted small text-nowrap mt-2">{time}</div>
              </div>
              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div className="font-weight-bold mb-1">{senderName}</div>
                {message.content}
              </div>
            </div>
          </p>
        );
      }
    });
  };

  const sendMessage = (input) => {
    if (input.trimEnd() !== "") {
      let newMessage = {
        content: input,
        senderId: user, //user
        type: "SUBCLUB",
      };
      setContent("");
      try {
        console.log("send");
        console.log(clientRef);
        clientRef.sendMessage(
          "/app/chat/" + chatSession,
          JSON.stringify(newMessage)
        ); // receiver

        setMessages((messages) => [...messages, newMessage]);

        return true;
      } catch (e) {
        return false;
      }
    }
  };

  const handleInputChanged = (event) => {
    setContent(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <>

      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "800vh",
          paddingTop: "0px",
          marginTop: "0",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                className={classes.title}
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                }}
            >
              LOVELACE
            </Typography>
            {
              <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                >
                  <MenuItem
                      onClick={(handleClose, redirectProfile)}
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#474747",
                      }}
                  >
                    {"Profile"}
                    {
                      <Avatar
                          alt="user-photo"
                          style={{
                            margin: "auto",
                            width: 30,
                            height: 30,
                            backgroundColor: color_list[user % 10],
                          }}
                      >
                        <Person />
                      </Avatar>
                    }
                  </MenuItem>
                  <MenuItem
                      onClick={(handleClose, handleLogout)}
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#474747",
                      }}
                  >
                    {"Sign Out"}
                    {
                      <Avatar
                          alt="exit-photo"
                          style={{
                            margin: "auto",
                            width: 30,
                            height: 30,
                          }}
                      >
                        <ExitToApp />
                      </Avatar>
                    }
                  </MenuItem>
                </Menu>
              </div>
            }
          </Toolbar>
        </AppBar>

        <SockJsClient
          url="http://localhost:8080/lovelace"
          topics={["/topic/messages/" + chatSession]} //user
          onConnect={onConnected}
          onDisconnect={disConnected}
          onMessage={onMessageReceived}
          ref={(client) => {
            setClientRef(client);
          }}
        />


        <main className="content">
          <div className="container p-0">
            <h1
              style={{
                fontFamily: "Garamond",
                alignItems: "center",
                color: "#474747",
              }}
              className="h3 mb-3"
            >
              Sub-club Chat
            </h1>

            <div className="card">
              <div className="row g-0">
                <div className="col-12 col-lg-5 col-xl-3 border-right">
                  <div className="px-4 d-none d-md-block">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <input
                          type="text"
                          className="form-control my-3"
                          value={search}
                          onChange={(e) => handleSearch(e)}
                          placeholder="Search..."
                        />
                      </div>
                    </div>
                  </div>
                  {enrolled_club_names.map((enrolled_club) => (
                    <a
                      href="#"
                      onClick={() =>
                        OnlineSubclub(
                          enrolled_club_names.indexOf(enrolled_club)
                        )
                      }
                      className="list-group-item list-group-item-action border-0"
                    >
                      {SearchCheck(enrolled_club) && (
                        <div className="d-flex align-items-start">
                          <div className="flex-grow-1 ml-3">
                            {enrolled_club}

                            <div className="small">
                              <span className="fas fa-circle chat-online"></span>{" "}
                            </div>
                          </div>
                        </div>
                      )}
                    </a>
                  ))}

                  <hr className="d-block d-lg-none mt-1 mb-0" />
                </div>
                <div className="col-12 col-lg-7 col-xl-9">
                  <div className="py-2 px-4 border-bottom d-none d-lg-block">
                    <div className="d-flex align-items-center py-1">
                      <div className="position-relative"></div>

                      <div className="flex-grow-1 pl-3">
                        <strong>
                          {
                            enrolled_club_names[
                              enrolled_club_ids.indexOf(online_subclub)
                            ]
                          }
                        </strong>
                        <div className="text-muted small">
                          <em>Chat</em>
                        </div>
                      </div>
                      <div>
                        <button className="btn btn-light border btn-lg px-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-more-horizontal feather-lg"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="position-relative">
                    <div className="chat-messages p-4">{showMessages()}</div>
                  </div>
                  {online_subclub && (
                    <div className="flex-grow-0 py-3 px-4 border-top">
                      <div className="input-group">
                        <input
                          type="text"
                          value={content}
                          onChange={(e) => handleInputChanged(e)}
                          className="form-control"
                          placeholder="Type your message"
                        />
                        <Button
                          type="submit"
                          style={{
                            background: "white",
                            border: "0px",
                            padding: "0px",
                          }}
                          className="btn btn-primary"
                          onClick={(e) => sendMessage(content)}
                        >
                          <BoopButton></BoopButton>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
