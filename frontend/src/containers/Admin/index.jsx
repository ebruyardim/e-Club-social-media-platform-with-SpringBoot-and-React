import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserConsumer from "../../contextUser";
import ClubConsumer from "../../contextClub";
import axios from "axios";
import {
  Grid,
  Container,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Button,
  Input,
  InputLabel,
} from "@material-ui/core";
import Background from "../../images/background/beige-background.jpg";
import date from "date-and-time";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { ExitToApp } from "@material-ui/icons";
import BuildIcon from "@material-ui/icons/Build";
import posed from "react-pose";
import auth from "../../auth";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },

  cardContent: {
    color: "#7E7E7E",
    flexGrow: 1,
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "1000vh",
    paddingTop: "0px",
    marginTop: "0",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
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

export function Admin(props) {
  const classes = useStyles();
  const now = new Date();
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [usersAll, setUsersAll] = useState([]);
  const [newClub, setNewClub] = useState({
    clubName: "",
    clubInfo: "",
    clubQuestion1: "",
    clubQuestion2: "",
    clubQuestion3: "",
    clubAnswer1_1: "",
    clubAnswer1_2: "",
    clubAnswer1_3: "",
    clubAnswer1_4: "",
    clubAnswer2_1: "",
    clubAnswer2_2: "",
    clubAnswer2_3: "",
    clubAnswer2_4: "",
    clubAnswer3_1: "",
    clubAnswer3_2: "",
    clubAnswer3_3: "",
    clubAnswer3_4: "",
  });

  const [newSubClub, setNewSubClub] = useState({
    id: "",
    name: "",
  });

  const [newInfo, setNewInfo] = useState({
    id: "",
    info: "",
  });

  const [deleteSubClub, setDeleteSubClub] = useState({
    id: "",
  });

  const handleChange = (prop) => (event) => {
    setNewClub({ ...newClub, [prop]: event.target.value });
  };

  const handleClubInfo = (prop) => (event) => {
    setNewInfo({ ...newInfo, [prop]: event.target.value });
  };

  const handleSubClubChange = (prop) => (event) => {
    setNewSubClub({ ...newSubClub, [prop]: event.target.value });
  };

  const handleDeleteSubClubChange = (prop) => (event) => {
    setDeleteSubClub({ ...deleteSubClub, [prop]: event.target.value });
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const url = "http://localhost:8080/member/getMemberSubclubInfos";
    axios.get(url).then((response) => {
      {
        setUsersAll(response.data);
      }
    });
  }, []);

  const handleDeleteAccount = (userIdInfo, dispatch) => {
    const url1 = "http://localhost:8080/member/deleteById/";
    const url2 = userIdInfo.toString();
    const url = url1.concat(url2);
    axios.delete(url);
    dispatch({
      type: "DELETE_USER",
      payload: userIdInfo,
    });
  };

  const handleDeleteClub = (clubIdInfo, dispatch) => {
    const url1 = "http://localhost:8080/clubs/deleteById/";
    const url2 = clubIdInfo.toString();
    const url = url1.concat(url2);
    axios.delete(url);
    dispatch({
      type: "DELETE_CLUB",
      payload: clubIdInfo,
    });
  };

  const handleDeleteSubClub = (dispatch) => {
    const url1 = "http://localhost:8080/subclubs/deleteById/";
    const url2 = deleteSubClub.id.toString();
    const url = url1.concat(url2);
    axios.delete(url);
    dispatch({
      type: "DELETE_SUBCLUB",
      payload: deleteSubClub.id,
    });
  };

  const handleAddClub = (dispatch) => {
    console.log(newClub);
    axios
      .post("http://localhost:8080/clubs/addNewClub", {
        clubName: newClub.clubName,
        clubInfo: newClub.clubInfo,
        clubQuestion1: newClub.clubQuestion1,
        clubQuestion2: newClub.clubQuestion2,
        clubQuestion3: newClub.clubQuestion3,
        clubAnswer1_1: newClub.clubAnswer1_1,
        clubAnswer1_2: newClub.clubAnswer1_2,
        clubAnswer1_3: newClub.clubAnswer1_3,
        clubAnswer1_4: newClub.clubAnswer1_4,
        clubAnswer2_1: newClub.clubAnswer2_1,
        clubAnswer2_2: newClub.clubAnswer2_2,
        clubAnswer2_3: newClub.clubAnswer2_3,
        clubAnswer2_4: newClub.clubAnswer2_4,
        clubAnswer3_1: newClub.clubAnswer3_1,
        clubAnswer3_2: newClub.clubAnswer3_2,
        clubAnswer3_3: newClub.clubAnswer3_3,
        clubAnswer3_4: newClub.clubAnswer3_4,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data !== -1) {
          dispatch({
            type: "ADD_CLUB",
            payload: {
              id: response.data,
              name: newClub.clubName,
              clubInfo: newClub.clubInfo,
              clubImage: null,
              subClubs: [],
              questions: [],
              members: [],
            },
          });
        }
      });
  };
  const handleBanUser = (userId, subClubId) => {
    const url =
      "http://localhost:8080/member-subclubs/dismissMember/" +
      subClubId +
      "/" +
      userId;
    axios.put(url).then((response) => {
      console.log(response.data);
    });
  };

  const handleAddSubClub = (dispatch) => {
    const url1 = "http://localhost:8080/subclubs/add/";
    const url2 = newSubClub.id.toString();
    const url = url1.concat(url2);
    const now_date = date.format(now, "YYYY-MM-DD HH:mm:ss");
    axios
      .post(url, {
        name: newSubClub.name,
        lastActivityTime: now_date,
      })
      .then((response) => {
        if (response.data !== -1) {
          dispatch({
            type: "ADD_SUBCLUB",
            payload: {
              id: response.data,
              club_id: newSubClub.id,
              adminId: null,
              lastActivityTime: now_date,
              name: newSubClub.name,
              rate: null,
            },
          });
        }
      });
  };

  const handleClubNewInfo = (dispatch) => {
    const url1 = "http://localhost:8080/clubs/update/";
    const url2 = newInfo.id.toString();
    const url3 = url1.concat(url2);
    const url4 = url3.concat("/");
    const url5 = newInfo.info.toString();
    const url = url4.concat(url5);
    console.log(url);
    axios
      .put(url, {
        id: newInfo.id,
        clubInfo: newInfo.info,
      })
      .then((response) => {
        if (response.data === "Updated") {
          dispatch({
            type: "UPDATE_CLUB_INFO",
            payload: {
              club_id: newInfo.id,
              clubInfo: newInfo.info,
            },
          });
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    auth.isAdmin(() => {});
    props.history.push("/");
  };

  return (
    <div className={classes.container}>
      <UserConsumer>
        {(value) => {
          const { users, dispatch } = value;
          return (
            <div>
              <br />
              <br />
              <Button
                variant="contained"
                color="default"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={classes.button}
                startIcon={<ExitToApp />}
                onClick={handleLogout.bind()}
              >
                SIGN OUT
              </Button>
              <br />
              <br />
              {console.log(usersAll)}
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{
                  color: "#6f112b",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Garamond",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#651f33",
                  }}
                >
                  USERS
                </h3>
                ________________________
              </Typography>
              <Container
                className={classes.cardGrid}
                maxWidth="md"
                alignitems="center"
              >
                {usersAll.map((user) => (
                  <Card className={classes.card}>
                    <Grid item key={user.id}>
                      <br />
                      <Typography
                        style={{
                          fontFamily: "Garamond",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#474747",
                        }}
                      >
                        <h3>{user.name}</h3>
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Garamond",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#474747",
                        }}
                      >
                        {user.mail}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Garamond",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#474747",
                        }}
                      >
                        {user.subclubList.map((subclub) => (
                          <div>
                            <h5
                              style={{
                                fontFamily: "Garamond",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#474747",
                              }}
                            >
                              {subclub.subclub}
                            </h5>

                            {subclub.banCount >= 3 ? (
                              <Button
                                disabled={subclub.isDismiss === 1}
                                variant="contained"
                                color="default"
                                className={classes.button}
                                style={{
                                  fontFamily: "Garamond",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                startIcon={<DeleteForeverIcon />}
                                onClick={handleBanUser.bind(
                                  this,
                                  user.id,
                                  subclub.subclubId
                                )}
                              >
                                Dismiss the user from this subclub
                              </Button>
                            ) : (
                              " "
                            )}
                          </div>
                        ))}
                      </Typography>
                      <Button
                        disabled={user.name === "lovelace"}
                        variant="contained"
                        color="default"
                        className={classes.button}
                        style={{
                          fontFamily: "Garamond",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        startIcon={<DeleteForeverIcon />}
                        onClick={handleDeleteAccount.bind(
                          this,
                          user.id,
                          dispatch
                        )}
                      >
                        Delete User
                      </Button>
                      <br />
                      <br />
                      <br />
                    </Grid>
                  </Card>
                ))}
              </Container>
            </div>
          );
        }}
      </UserConsumer>
      <ClubConsumer>
        {(value) => {
          const { clubs, dispatch } = value;
          return (
            <div>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{
                  color: "#6f112b",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Garamond",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#651f33",
                  }}
                >
                  CLUBS
                </h3>
                ________________________
                <br />
                <Button
                  variant="contained"
                  color="default"
                  style={{
                    fontFamily: "Garamond",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className={classes.button}
                  onClick={handleVisibility.bind(this)}
                >
                  {visible ? "HIDE" : "CLUB & SUBCLUB OPERATIONS"}
                </Button>
                <Animation pose={visible ? "visible" : "hidden"}>
                  <div>
                    <br />
                    <InputLabel>New Club Name</InputLabel>
                    <Input
                      id="clubName"
                      value={newClub.clubName}
                      onChange={handleChange("clubName")}
                    />
                    <br />
                    <InputLabel>New Club Info</InputLabel>
                    <Input
                      id="clubInfo"
                      value={newClub.clubInfo}
                      onChange={handleChange("clubInfo")}
                    />
                    <br />
                    <br />
                    <InputLabel>New Club Question 1</InputLabel>
                    <Input
                      id="clubQuestion1"
                      value={newClub.clubQuestion1}
                      onChange={handleChange("clubQuestion1")}
                    />
                    <br />
                    <InputLabel>New Club Answer 1</InputLabel>
                    <Input
                      id="clubAnswer1_1"
                      value={newClub.clubAnswer1_1}
                      onChange={handleChange("clubAnswer1_1")}
                    />
                    <br />
                    <InputLabel>New Club Answer 2</InputLabel>
                    <Input
                      id="clubAnswer1_2"
                      value={newClub.clubAnswer1_2}
                      onChange={handleChange("clubAnswer1_2")}
                    />
                    <br />
                    <InputLabel>New Club Answer 3</InputLabel>
                    <Input
                      id="clubAnswer1_3"
                      value={newClub.clubAnswer1_3}
                      onChange={handleChange("clubAnswer1_3")}
                    />
                    <br />
                    <InputLabel>New Club Answer 4</InputLabel>
                    <Input
                      id="clubAnswer1_4"
                      value={newClub.clubAnswer1_4}
                      onChange={handleChange("clubAnswer1_4")}
                    />
                    <br />
                    <br />
                    <InputLabel>New Club Question 2</InputLabel>
                    <Input
                      id="clubQuestion2"
                      value={newClub.clubQuestion2}
                      onChange={handleChange("clubQuestion2")}
                    />
                    <br />
                    <InputLabel>New Club Answer 1</InputLabel>
                    <Input
                      id="clubAnswer2_1"
                      value={newClub.clubAnswer2_1}
                      onChange={handleChange("clubAnswer2_1")}
                    />
                    <br />
                    <InputLabel>New Club Answer 2</InputLabel>
                    <Input
                      id="clubAnswer2_2"
                      value={newClub.clubAnswer2_2}
                      onChange={handleChange("clubAnswer2_2")}
                    />
                    <br />
                    <InputLabel>New Club Answer 3</InputLabel>
                    <Input
                      id="clubAnswer2_3"
                      value={newClub.clubAnswer2_3}
                      onChange={handleChange("clubAnswer2_3")}
                    />
                    <br />
                    <InputLabel>New Club Answer 4</InputLabel>
                    <Input
                      id="clubAnswer2_4"
                      value={newClub.clubAnswer2_4}
                      onChange={handleChange("clubAnswer2_4")}
                    />
                    <br />
                    <br />
                    <InputLabel>New Club Question 3</InputLabel>
                    <Input
                      id="clubQuestion3"
                      value={newClub.clubQuestion3}
                      onChange={handleChange("clubQuestion3")}
                    />
                    <br />
                    <InputLabel>New Club Answer 1</InputLabel>
                    <Input
                      id="clubAnswer3_1"
                      value={newClub.clubAnswer3_1}
                      onChange={handleChange("clubAnswer3_1")}
                    />
                    <br />
                    <InputLabel>New Club Answer 2</InputLabel>
                    <Input
                      id="clubAnswer3_2"
                      value={newClub.clubAnswer3_2}
                      onChange={handleChange("clubAnswer3_2")}
                    />
                    <br />
                    <InputLabel>New Club Answer 3</InputLabel>
                    <Input
                      id="clubAnswer3_3"
                      value={newClub.clubAnswer3_3}
                      onChange={handleChange("clubAnswer3_3")}
                    />
                    <br />
                    <InputLabel>New Club Answer 4</InputLabel>
                    <Input
                      id="clubAnswer3_4"
                      value={newClub.clubAnswer3_4}
                      onChange={handleChange("clubAnswer3_4")}
                    />
                    <br />
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<AddBoxIcon />}
                      onClick={handleAddClub.bind(this, dispatch)}
                    >
                      Add Club
                    </Button>
                  </div>
                  <div>
                    <br />
                    <InputLabel>Club Id</InputLabel>
                    <Input id="id" onChange={handleSubClubChange("id")} />
                    <br />
                    <InputLabel>New Sub-club Name</InputLabel>
                    <Input id="name" onChange={handleSubClubChange("name")} />
                    <br />
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<AddBoxIcon />}
                      onClick={handleAddSubClub.bind(this, dispatch)}
                    >
                      Add Sub-Club
                    </Button>
                  </div>
                  <div>
                    <br />
                    <InputLabel>Club Id</InputLabel>
                    <Input id="id" onChange={handleClubInfo("id")} />
                    <br />
                    <InputLabel>Club Info</InputLabel>
                    <Input id="info" onChange={handleClubInfo("info")} />
                    <br />
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<BuildIcon />}
                      onClick={handleClubNewInfo.bind(this, dispatch)}
                    >
                      Update Club Info
                    </Button>
                  </div>
                  <div>
                    <br />
                    <InputLabel>Sub-club Id</InputLabel>
                    <Input
                      id="subClubId"
                      onChange={handleDeleteSubClubChange("id")}
                    />
                    <br />
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<DeleteForeverIcon />}
                      onClick={handleDeleteSubClub.bind(this, dispatch)}
                    >
                      Delete Sub-Club
                    </Button>
                  </div>
                </Animation>
              </Typography>
              <Container
                className={classes.cardGrid}
                maxWidth="md"
                alignitems="center"
              >
                {clubs.map((club) => (
                  <Card className={classes.card}>
                    <Grid item key={club.id}>
                      <Typography
                        variant="h5"
                        component="h3"
                        style={{
                          fontFamily: "Garamond",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#6f112b",
                        }}
                      >
                        <br />
                        {club.name.toUpperCase()}
                        <br />
                        (id: {club.id})
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "Garamond",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3>{club.clubInfo}</h3>
                      </Typography>
                      <br />
                      <Typography
                        style={{
                          fontFamily: "Garamond",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#6f112b",
                        }}
                      >
                        {" "}
                        SUBCLUBS:
                      </Typography>
                      {club.subClubs.map((subClub) => (
                        <li
                          key={subClub.id}
                          style={{
                            fontFamily: "Garamond",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {subClub.name} (id: {subClub.id})
                        </li>
                      ))}

                      <div>
                        <Button
                          variant="contained"
                          color="default"
                          className={classes.button}
                          style={{
                            fontFamily: "Garamond",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          startIcon={<DeleteForeverIcon />}
                          onClick={handleDeleteClub.bind(
                            this,
                            club.id,
                            dispatch
                          )}
                        >
                          Delete Club
                        </Button>
                      </div>
                      <br />
                      <br />
                    </Grid>
                  </Card>
                ))}
              </Container>
            </div>
          );
        }}
      </ClubConsumer>
    </div>
  );
}
