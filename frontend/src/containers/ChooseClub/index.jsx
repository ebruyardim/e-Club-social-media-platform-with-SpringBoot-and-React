import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  Button,
  makeStyles,
  Avatar,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Select,
  FormHelperText,
} from "@material-ui/core";

import Background from "../../images/background/beige-background.jpg";
import ClubConsumer from "../../contextClub";
import auth from "../../auth";
import LinearProgress from "@material-ui/core/LinearProgress";
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

export function ChooseClub() {
  const [clubSelect, setClubSelect] = useState("");
  const [newSubClub, setNewSubClub] = useState("")
  const classes = useStyles();
  const history = useHistory();
  const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [enrollable_club_ids, setEnrollable_club_ids] = useState([]);
  const [enrollable_subclub_ids, setEnrollable_subclub_ids] = useState([]);
  const [enrolled_club_ids, setEnrolled_club_ids] = useState([]);
  const [banned_subclub, setBanned_subclub] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [Alertopen, setAlertOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [leavedSubclubId, setLeavedSubclubId] = useState(-1);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setIsLoading(false);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      const url =
        "http://localhost:8080/choose-clubs/all/" + userIdInfo.toString();
      axios.get(url).then((response) => {
        {
          response.data.map((enrollable_club) => {
            if (
              !enrollable_club_ids.find(
                (o) => o === enrollable_club.clubId.toString()
              )
            ) {
              setEnrollable_club_ids((enrollable_club_ids) => [
                ...enrollable_club_ids,
                enrollable_club.clubId,
              ]);
            }
          });
        }
      });
    }, 10000);
  }, []);

  useEffect(() => {
    if (count === 0) {
      const url =
        "http://localhost:8080/member-subclubs/getByMember/" +
        userIdInfo.toString();
      axios.get(url).then((response) => {
        {
          response.data.map((enrolled_club) => {
            console.log(enrollable_club_ids);
            console.log(enrolled_club.subclubId);
            if (!enrolled_club_ids.includes(enrolled_club.subclubId)) {
              setEnrolled_club_ids((enrolled_club_ids) => [
                ...enrolled_club_ids,
                enrolled_club.subclubId,
              ]);
              setBanned_subclub((banned_subclub) => [
                ...banned_subclub,
                enrolled_club.isDismiss,
              ]);
            }
          });
        }
      });
      setCount(1);
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    setClubSelect(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertOpen = (subclubId) => {
    setLeavedSubclubId(subclubId);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const redirectProfile = () => {
    history.push("/profile");
  };

  const handleLogout = () => {
    const url = "http://localhost:8080/member/logout/" + userIdInfo.toString();
    axios.get(url).then(console.log(url));
    localStorage.removeItem("userId");
    auth.isAuthenticated(() => {});
    history.push("/");
  };

  const handleEnroll = (subClubId) => {
    console.log(subClubId);
    const url = "http://localhost:8080/member-subclubs/joinSubclubs";
    axios
      .post(url, {
        memberId: userIdInfo,
        subclubId: subClubId,
      })
      .then((response) => {
        console.log(response.data);
        refreshPage();
      });
  };

  const handleLeave = (subClubId) => {
    console.log(subClubId);
    const url =
      "http://localhost:8080/member-subclubs/leaveSubClub/" +
      subClubId +
      "/" +
      userIdInfo;
    axios.delete(url).then((response) => {
      console.log(response.data);
      history.push("/profile");
    });
  };

  const refreshPage = () => {
    history.push("/chooseclub");
  };

  function handleNewSubclub() {
  console.log(newSubClub);
  if(clubSelect!==""&&(newSubClub.trimEnd() !== "")) {
    axios
        .post("http://localhost:8080/newSubclubRequest/addNew/" + userIdInfo, {
          subclubName: newSubClub,
          clubId: clubSelect,
        })
        .then((response) => {
          console.log(response.data);
          setResponse(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error.response);
        });

    setNewSubClub("");
    setClubSelect("");

  }
  else {setResponse("Please fill the form to open a sub-club!")}
  }

  return (
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
      <div>
        {isLoading && <LinearProgress variant="determinate" value={progress} />}
      </div>
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
                        backgroundColor: color_list[userIdInfo % 10],
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
      <div>
        <ClubConsumer>
          {(value) => {
            const { clubs } = value;

            return (
              <div>
                <div>
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
                          Are you sure you want to leave?{" "}
                        </h3>
                      </DialogTitle>
                      <DialogContentText id="alert-dialog-description">
                        <h4
                          style={{
                            fontFamily: "Garamond",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          All posts, comments, etc. will be deleted!
                        </h4>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleLeave.bind(this, leavedSubclubId)}
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
                {clubs.map((club) => (
                  <Grid item key={club.id} xs={12} sm={6} md={4}>
                    <div>
                      {enrollable_club_ids.indexOf(club.id) > -1 ? (
                        <div>
                          {
                            <ul>
                              <br />
                              <h3
                                style={{
                                  fontFamily: "Garamond",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#474747",
                                }}
                              >
                                {club.name.toUpperCase()}
                              </h3>
                              <br />
                              <h5
                                style={{
                                  fontFamily: "Garamond",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#474747",
                                }}
                              >
                                {club.clubInfo}
                              </h5>
                              {club.subClubs.map((subClub) => (
                                <div key={subClub.id}>
                                  {enrolled_club_ids.includes(subClub.id) ? (
                                    banned_subclub[
                                      enrolled_club_ids.indexOf(subClub.id)
                                    ] === 0 ? (
                                      <div>
                                        <h4
                                          style={{
                                            fontFamily: "Garamond",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#474747",
                                          }}
                                        >
                                          {subClub.name}
                                        </h4>
                                        <Button
                                          disabled={enrolled_club_ids.includes(
                                            subClub.id
                                          )}
                                          variant="contained"
                                          color="default"
                                          style={{
                                            fontFamily: "Garamond",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#474747",
                                          }}
                                          className={classes.button}
                                          onClick={handleEnroll.bind(
                                            this,
                                            subClub.id
                                          )}
                                        >
                                          Enroll
                                        </Button>

                                        <Button
                                          disabled={
                                            !enrolled_club_ids.includes(
                                              subClub.id
                                            )
                                          }
                                          variant="contained"
                                          color="default"
                                          style={{
                                            fontFamily: "Garamond",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "#474747",
                                          }}
                                          className={classes.button}
                                          onClick={handleAlertOpen.bind(
                                            this,
                                            subClub.id
                                          )}
                                        >
                                          Leave
                                        </Button>
                                        <br />
                                        <br />
                                      </div>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    <div>
                                      <h4
                                        style={{
                                          fontFamily: "Garamond",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#474747",
                                        }}
                                      >
                                        {subClub.name}
                                      </h4>
                                      <Button
                                        disabled={enrolled_club_ids.includes(
                                          subClub.id
                                        )}
                                        variant="contained"
                                        color="default"
                                        style={{
                                          fontFamily: "Garamond",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#474747",
                                        }}
                                        className={classes.button}
                                        onClick={handleEnroll.bind(
                                          this,
                                          subClub.id
                                        )}
                                      >
                                        Enroll
                                      </Button>

                                      <Button
                                        disabled={
                                          !enrolled_club_ids.includes(
                                            subClub.id
                                          )
                                        }
                                        variant="contained"
                                        color="default"
                                        style={{
                                          fontFamily: "Garamond",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#474747",
                                        }}
                                        className={classes.button}
                                        onClick={handleAlertOpen.bind(
                                          this,
                                          subClub.id
                                        )}
                                      >
                                        Leave
                                      </Button>
                                      <br />
                                      <br />
                                    </div>
                                  )}
                                </div>
                              ))}
                              <br />
                              <br />
                              <br />
                            </ul>
                          }
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Grid>
                ))}
                <p>Please let us now if you have any new Sub-club suggestions ↓</p>
                <br />
                <p style={{color:"red"}}>{response}</p>
                <br />
                <InputLabel
                    style={{
                      fontFamily: "Garamond",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#474747",
                    }}
                >
                  <h3>New Sub-club Request</h3>
                </InputLabel>
                <Input id="Feedback" value={newSubClub} onChange={event => setNewSubClub(event.target.value)} placeholder="Type a sub-club name" />
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

                    onClick={() => handleNewSubclub()}
                >
                  Send!
                </Button>


                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">Club</InputLabel>
                  <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={clubSelect}
                      onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {clubs.map((club) => (
                        <MenuItem value={club.id}>{club.name}</MenuItem>
                    ))}

                  </Select>
                  <FormHelperText>Choose the club to add a sub-club</FormHelperText>
                </FormControl>
              </div>
            );
          }}
        </ClubConsumer>
      </div>
    </div>
  );
}
