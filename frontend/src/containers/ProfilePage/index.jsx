import { React, useState, useEffect } from "react";
import UserConsumer from "../../contextUser";
import {
  Button,
  makeStyles,
  Avatar,
  Typography,
  Container,
  Input,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
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
import Background from "../../images/background/beige-background.jpg";
import { ExitToApp, Person } from "@material-ui/icons";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import BuildIcon from "@material-ui/icons/Build";
import Logo from "../../images/logo/logo_transparent.png";
import { Link, useHistory } from "react-router-dom";
import MessageIcon from '@material-ui/icons/Message';
// import EnrolledClubConsumer from "../../contextEnrolledClubs";
import axios from "axios";
import auth from "../../auth";
import posed from "react-pose";
import "./index.css";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{
        fontFamily: "Garamond",
        justifyContent: "center",
        alignItems: "center",
        color: "#474747",
      }}
    >
      {"Copyright © "}{" "}
      <Link
        to="/"
        className="btn btn-primary"
        style={{
          fontSize: "15px",
          border: "0px",
          background: "transparent",
          fontFamily: "Garamond",
          alignItems: "center",
          color: "#722f2f",
          justifyContent: "center",
        }}
      >
        LOVELACE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  ul: {
    margin: "0",
    padding: "0",
  },
  body: {
    margin: "0",
    padding: "0",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  iconText: {
    paddingLeft: 10,
    paddingTop: 80,
    paddingBottom: 10,
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
  },
  container: {
    paddingTop: "0px",
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "350vh",
    marginTop: "0",
  },
}));

const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      display: "block",
    },
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      display: "none",
    },
  },
});

export function ProfilePage(props) {
  const classes = useStyles();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));

  const [userNameInfo, setUserNameInfo] = useState("");
  const [userQuestionnaireInfo, setUserQuestionnaireInfo] = useState(0);
  const [enrolled_club_names, setEnrolled_club_names] = useState([]);
  const [enrolled_club_ids, setEnrolled_club_ids] = useState([]);
  const [banned_subclub, setBanned_subclub] = useState([]);
  const [Alertopen, setAlertOpen] = useState(false);
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

  const [feedback, setFeedback] = useState({
    feedback: "",
  });

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleFeedback = (prop) => (event) => {
    setFeedback({ ...feedback, [prop]: event.target.value });
  };

  useEffect(() => {
    if (count === 0) {
      const url =
        "http://localhost:8080/member/getMemberDetails/" +
        userIdInfo.toString();
      axios.get(url).then((response) => {
        console.log(response.data);
        response.data["subclubs"].map((subclub) => {
          if (subclub.startsWith("id: ")) {
            if (!enrolled_club_ids.find((o) => o === subclub.split(" ")[1])) {
              setEnrolled_club_ids((enrolled_club_ids) => [
                ...enrolled_club_ids,
                subclub.split(" ")[1],
              ]);
            }
          } else if (subclub.startsWith("isBanned: ")) {
            if (!banned_subclub.find((o) => o === subclub.split(" ")[1])) {
              setBanned_subclub((banned_subclub) => [
                ...banned_subclub,
                subclub.split(" ")[1],
              ]);
            }
          } else if (
            !subclub.startsWith("banCount: ") &&
            !subclub.startsWith("isDismiss: ")
          ) {
            if (!enrolled_club_names.find((o) => o === subclub.toString())) {
              //console.log(subclub);
              setEnrolled_club_names((enrolled_club_names) => [
                ...enrolled_club_names,
                subclub,
              ]);
            }
          }
        });
      });
      setCount(1);
    }
  }, []);

  const clubIdInfoFunc = (id) => {
    localStorage.setItem("subclubId", JSON.stringify(enrolled_club_ids[id]));
  };

  const handleLogout = () => {
    const url1 = "http://localhost:8080/member/logout/";
    const url2 = userIdInfo.toString();
    const url = url1.concat(url2);
    axios.get(url).then(console.log(url));
    localStorage.removeItem("userId");
    auth.isAuthenticated(() => {});
    history.push("/");
  };

  const handleSubclubChat = () => {
    history.push("/chat");
  };

  const handleSubClubOperations = () => {
    history.push("/chooseClub");
  };

  const handleDeleteAccount = (dispatch) => {
    const url1 = "http://localhost:8080/member/deleteById/";
    const url2 = userIdInfo.toString();
    const url = url1.concat(url2);
    axios.delete(url);
    dispatch({
      type: "DELETE_USER",
      payload: userIdInfo,
    });
    history.push("/");
  };

  const handleQuestionnairePage = () => {
    history.push("/questionnaire");
  };

  return (
    <div
      style={{
        paddingTop: "0px",
        marginTop: "0",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <UserConsumer style={{ paddingTop: "0px" }}>
        {(value) => {
          const { users, dispatch } = value;

          return (
            <div className={classes.container}>
              <div style={{ paddingTop: "0px", marginTop: "0" }}>
                <Dialog
                  open={Alertopen === true}
                  onClose={handleAlertClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogTitle>
                      <h3
                        style={{
                          fontFamily: "Garamond",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Are you sure you want to delete account?{" "}
                      </h3>
                    </DialogTitle>
                    {/* <DialogContentText id="alert-dialog-description"></DialogContentText> */}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleDeleteAccount.bind(this, dispatch)}
                      color="primary"
                      style={{
                        fontFamily: "Garamond",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={handleAlertClose}
                      color="primary"
                      style={{
                        fontFamily: "Garamond",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <br />
              <div>
                {users.map((user) => {
                  if (user.id === userIdInfo) {
                    setUserNameInfo(user.username);
                    setUserQuestionnaireInfo(user.isQuestionnaire);
                  }
                })}
                {/* <img src={Logo} alt="Logo" width="100" height="100"></img> */}
                <Avatar
                  alt="user-photo"
                  style={{
                    margin: "auto",
                    width: 100,
                    height: 100,
                    backgroundColor: color_list[userIdInfo % 10],
                  }}
                >
                  <Person />
                </Avatar>
                <h2
                  style={{
                    fontFamily: "Garamond",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                  }}
                >
                  Hi {userNameInfo}!
                </h2>
                <br />

                <Animation
                  pose={userQuestionnaireInfo === 0 ? "visible" : "hidden"}
                >
                  <h2
                    style={{
                      fontFamily: "Garamond",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#474747",
                    }}
                  >
                    To begin your fun, solve the questionnaire ↓
                  </h2>
                  <br />
                  <br />
                  <div>
                    <Button
                      // disabled={userQuestionnaireInfo}
                      variant="contained"
                      color="default"
                      className={classes.button}
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#474747",
                      }}
                      startIcon={<NotListedLocationIcon />}
                      onClick={handleQuestionnairePage.bind()}
                    >
                      QUESTIONNAIRE
                    </Button>
                  </div>
                  <br />
                  <br />
                </Animation>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<MessageIcon />}
                  onClick={handleSubclubChat.bind()}
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                  }}
                  className={classes.button}
                >
                  SUBCLUB CHAT
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<ExitToApp />}
                  onClick={handleLogout.bind()}
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                  }}
                  className={classes.button}
                >
                  SIGN OUT
                </Button>
                <br />
                <div>
                  <h3
                    style={{
                      fontFamily: "Garamond",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#474747",
                    }}
                  >
                    Enrolled Sub-clubs
                  </h3>
                  {enrolled_club_names.map((enrolled_club) => {
                    {
                      // console.log(enrolled_club_names);
                      // console.log(enrolled_club_ids);
                      // console.log(banned_subclub);
                      if (
                        banned_subclub[
                          enrolled_club_names.indexOf(enrolled_club)
                        ] === "0"
                      ) {
                        return (
                          <h3
                            style={{
                              fontFamily: "Garamond",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "#474747",
                            }}
                          >
                            <Link
                              to="/subclub"
                              className="btn btn-primary "
                              onClick={clubIdInfoFunc.bind(
                                this,
                                enrolled_club_names.indexOf(enrolled_club)
                              )}
                              style={{
                                fontSize: "20px",
                                border: "0px",
                                background: "transparent",
                                fontFamily: "Garamond",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#722f2f",
                              }}
                            >
                              {enrolled_club}
                            </Link>
                          </h3>
                        );
                      }
                    }
                  })}
                </div>
                <Button
                  variant="contained"
                  color="default"
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                  }}
                  className={classes.button}
                  startIcon={<BuildIcon />}
                  onClick={handleSubClubOperations.bind()}
                >
                  Sub-club Operations
                </Button>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div>
                <Button
                  variant="contained"
                  color="default"
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                  }}
                  className={classes.button}
                  startIcon={<DeleteForeverIcon />}
                  onClick={handleAlertOpen.bind(this)}
                >
                  Delete Account
                </Button>
                <br />
                <br />
                <br />
              </div>
            </div>
          );
        }}
      </UserConsumer>

      {/* <div>
        <EnrolledClubConsumer>
          {(value) => {
            const { enrolled_clubs } = value;
            return (
              <div>
                {enrolled_clubs.map((enrolled_club) => (
                  <Grid
                    item
                    key={enrolled_club.subclubId}
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <li>{enrolled_club.subclubId}</li>
                  </Grid>
                ))}
              </div>
            );
          }}
        </EnrolledClubConsumer>
      </div> */}
      <div>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography
              variant="body1"
              style={{
                paddingTop: "0px",
                fontFamily: "Garamond",
                justifyContent: "center",
                alignItems: "center",
                color: "#474747",
                marginTop: "0",
              }}
            >
              Please let us now if you have any suggestions or comments ↓
              <br />
              <br />
              <InputLabel
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                <h3>Feedback</h3>
              </InputLabel>
              <Input id="Feedback" onChange={handleFeedback("feedback")} />
              <br />
              <Button
                variant="contained"
                color="default"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
                className={classes.button}

                //onClick={handleDeleteSubClub.bind(this)}
              >
                Send!
              </Button>
            </Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </div>
  );
}
