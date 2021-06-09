import { React, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ChatIcon from "@material-ui/icons/Chat";
import Logo from "../../images/logo/logo_transparent.png";
import {
  Button,
  OutlinedInput,
  InputLabel,
  Container,
  Avatar,
  Box,
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
import { Person } from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Rating from "@material-ui/lab/Rating";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import axios from "axios";
import PostConsumer from "../../contextPost";
import PostCommentConsumer from "../../contextPostComment";
import SubclubCommentConsumer from "../../contextSubclubComment";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import auth from "../../auth";
import Iframe from "react-iframe";
import posed from "react-pose";
import { SplitPane, Pane } from "react-multi-split-pane";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "theme.palette.background.paper",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  inline: {
    display: "inline",
  },

  paper: {
    padding: theme.spacing(2),
    width: 500,
    margin: "auto",
  },
  paperComment: {
    padding: theme.spacing(2),
    margin: "auto",
    width: 400,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },

  cardContent: {
    color: "#7E7E7E",
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "800vh",
  },
}));

const Animation2 = posed.div({
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

export function Subclub(props) {
  const classes = useStyles();
  const [clubname, setClubName] = useState("");
  const [adminId, setAdminId] = useState("");
  const history = useHistory();
  const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));
  const subclubIdInfo = parseInt(JSON.parse(localStorage.getItem("subclubId")));
  const [isIFrame, setIsIFrame] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [rate, setRate] = useState(5);
  const [values, setValues] = useState({
    content: "",
  });

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

  const [member_ids, setMember_ids] = useState([]);
  const [subclubPostsReel, setSubclubPostsReel] = useState([]);
  const [subclubComments, setSubclubComments] = useState([]);
  const [events, setEvents] = useState([]);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [commentValues, setCommentValues] = useState({
    content: "",
  });
  const [eventValues, setEventValues] = useState({
    application: "",
    link: "",
  });
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState("08:00");
  const [value3, onChange3] = useState("10:00");
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (count === 0) {
      const url = "http://localhost:8080/subclubs/all/";
      axios.get(url).then((response) => {
        {
          response.data.map((subclub) => {
            if (subclub.id.toString() === subclubIdInfo.toString()) {
              setClubName(subclub.name);
              setAdminId(subclub.adminId);
              subclub.members.map((member) => {
                if (!member_ids.find((o) => o === member.toString())) {
                  setMember_ids((member_ids) => [...member_ids, member]);
                }
              });
            }
          });
        }
      });
    }
    setCount(count + 1);
  }, []);

  useEffect(() => {
    const url = "http://localhost:8080/subclubs/getRateById/" + subclubIdInfo;
    if (count2 === 0) {
      axios.get(url).then((response) => {
        {
          setRate(response.data.charAt(response.data.length - 1));
        }
      });
    }
    setCount2(count2 + 1);
  }, []);

  useEffect(() => {
    if (count3 === 0) {
      const url =
        "http://localhost:8080/subclubComments/getById/" + subclubIdInfo;
      axios.get(url).then((response) => {
        {
          response.data.map((comment) => {
            if (!subclubComments.find((o) => o === comment.toString())) {
              setSubclubComments((subclubComments) => [
                ...subclubComments,
                comment,
              ]);
            }
          });
        }
      });
    }
    setCount3(count3 + 1);
  }, []);

  useEffect(() => {
    if (count4 === 0) {
      const url = "http://localhost:8080/getEvents/" + subclubIdInfo.toString();
      axios.get(url).then((response) => {
        {
          console.log("***************");
          console.log(response.data);
          response.data.map((event) => {
            if (!events.find((o) => o === event.toString())) {
              setEvents((events) => [...events, event]);
            }
          });
        }
      });
    }
    setCount4(count4 + 1);
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeSubclubComment = (prop) => (event) => {
    setCommentValues({ ...commentValues, [prop]: event.target.value });
  };

  const handleChangeEvent = (prop) => (event) => {
    setEventValues({ ...eventValues, [prop]: event.target.value });
  };

  const handleSubmit = (dispatch) => {
    if (!validator.isEmpty(values.content)) {
      axios
        .post(
          "http://localhost:8080/subclubPosts/createPost/" +
            userIdInfo.toString() +
            "/" +
            subclubIdInfo.toString(),
          {
            content: values.content,
          }
        )
        .then((response) => {
          console.log(userIdInfo.toString() + "/" + subclubIdInfo.toString());
          console.log(response.data);
          if (response.data === "Saved") {
            console.log("Added post:");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    history.push("/subclub");
  };

  const messageToUserIdInfoFunc = (id) => {
    setIsIFrame(false);
    setIsIFrame(true);
    localStorage.setItem("messageToUserIdInfo", JSON.stringify(id));
  };

  const handleComment = (prop) => (event) => {
    setComment({ ...comment, [prop]: event.target.value });
  };

  const handleSubmitForComment = (postId, dispatch) => {
    console.log(postId);
    axios
      .post(
        "http://localhost:8080/postComments/add/" +
          postId.toString() +
          "/" +
          userIdInfo.toString(),
        {
          comment: comment.comment,
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(comment.comment);
        if (response.data[0] === "C") {
          console.log("yes");
          dispatch({
            type: "ADD_COMMENT",
            payload: {
              comment: comment.comment,
              memberId: userIdInfo,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    history.push("/subclub");
  };

  const handleSubmitForSubclubComment = (dispatch) => {
    if (!validator.isEmpty(commentValues.content)) {
      axios
        .post(
          "http://localhost:8080/subclubComments/add/" +
            subclubIdInfo.toString() +
            "/" +
            userIdInfo.toString(),
          {
            content: commentValues.content,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "Subclub comment saved") {
            console.log("Added comment:");
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    history.push("/subclub");
  };

  const handleSubmitForEvent = () => {
    if (value.getMonth() + 1 < 10) {
      setDate(
        value.getFullYear().toString() +
          "-" +
          "0" +
          (value.getMonth() + 1).toString() +
          "-" +
          value.getDate().toString()
      );
    } else {
      setDate(
        value.getFullYear().toString() +
          "-" +
          (value.getMonth() + 1).toString() +
          "-" +
          value.getDate().toString()
      );
    }
    console.log(date + " " + value2.toString() + ":00");
    console.log(eventValues.application);
    console.log(eventValues.link);
    if (
      !validator.isEmpty(eventValues.application) &&
      !validator.isEmpty(eventValues.link)
    ) {
      console.log(":)");
      axios
        .post("http://localhost:8080/addEvent/" + subclubIdInfo.toString(), {
          application: eventValues.application,
          startTime: date + " " + value2.toString() + ":00",
          finishTime: date + " " + value3.toString() + ":00",
          link: eventValues.link,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleUpdateLike = (id) => {
    const url =
      "http://localhost:8080/subclubPosts/updateLike/" + id.toString();
    axios.put(url).then((response) => {
      console.log(response.data);
    });
  };

  const handleRate = (new_rate) => {
    const url =
      "http://localhost:8080/subclubs/updateRate/" +
      new_rate +
      "/" +
      subclubIdInfo;
    axios.put(url).then((response) => {
      setRate(response.data.charAt(response.data.length - 1));
    });
  };

  const handleAdmin = () => {
    const url =
      "http://localhost:8080/member-subclubs/makeAdminRequest/" +
      subclubIdInfo +
      "/" +
      userIdInfo;
    axios.put(url).then((response) => {
      console.log(response.data);
    });
  };

  const handleDeletePost = (id) => {
    console.log(id.toString());
    const url =
      "http://localhost:8080/subclubPosts/deleteById/" + id.toString();
    axios.delete(url).then((response) => {
      console.log(response.data);
    });
  };

  const handleDeleteComment = (id, memberId) => {
    if (memberId.toString() === userIdInfo.toString()) {
      console.log(id.toString());
      const url =
        "http://localhost:8080/postComments/deleteById/" + id.toString();
      axios.delete(url).then((response) => {
        console.log(response.data);
      });
    }
  };

  const handleDeleteSubclubComment = (id, memberId) => {
    if (memberId.toString() === userIdInfo.toString()) {
      const url =
        "http://localhost:8080/subclubComments/deleteById/" + id.toString();
      axios.delete(url).then((response) => {
        console.log(response.data);
      });
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectProfile = () => {
    localStorage.removeItem("subclubId");
    if (!Number.isNaN(parseInt(JSON.parse(localStorage.getItem("userId"))))) {
      localStorage.removeItem("messageToUserIdInfo");
    }
    history.push("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("subclubId");
    const url = "http://localhost:8080/member/logout/" + userIdInfo.toString();
    axios.get(url).then(console.log(url));
    localStorage.removeItem("userId");
    auth.isAuthenticated(() => {});
    history.push("/");
  };

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

      <SplitPane>
        <div>
          <div>
            <img src={Logo} alt="Logo" width="300" height="300"></img>
            <h2
              style={{
                fontFamily: "Garamond",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Welcome to {clubname}!{" "}
            </h2>
          </div>

          {adminId == null || adminId === 0 ? (
            <Button
              variant="contained"
              style={{
                fontFamily: "Garamond",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="submit"
              onClick={handleAdmin.bind(this)}
            >
              I want to be {clubname} subclub admin
            </Button>
          ) : (
            ""
          )}

          <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography
                component="legend"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                {rate} / 5
              </Typography>

              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                  handleRate(newValue);
                }}
              />
            </Box>
          </div>
          {adminId != null && userIdInfo.toString() === adminId.toString() ? (
            <h5
              style={{
                fontFamily: "Garamond",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#651f33",
              }}
            >
              YOU ARE SUBCLUB ADMIN
            </h5>
          ) : (
            ""
          )}

          <div>
            <SubclubCommentConsumer>
              {(value) => {
                const { dispatch } = value;
                return (
                  <div className={classes.root}>
                    <br />
                    <InputLabel
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      htmlFor="subclubComment"
                    >
                      What do you think about this subclub?
                    </InputLabel>
                    <OutlinedInput
                      id="subclubComment"
                      value={commentValues.content}
                      onChange={handleChangeSubclubComment("content")}
                      labelWidth={160}
                      rows="3"
                      inputProps={{
                        "aria-label": "subclubComment",
                      }}
                    />
                    <Button
                      type="submit"
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={handleSubmitForSubclubComment.bind(
                        this,
                        dispatch
                      )}
                    >
                      Add comment
                    </Button>
                  </div>
                );
              }}
            </SubclubCommentConsumer>
          </div>

          <div>
            {subclubComments.map((comment) => (
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={5}>
                  <Grid item>
                    <Avatar
                      alt="user-photo"
                      style={{
                        margin: "auto",
                        width: 80,
                        height: 80,
                        backgroundColor: color_list[comment.memberId % 10],
                      }}
                    >
                      <Person />
                    </Avatar>
                  </Grid>

                    <Button
                      gutterBottom
                      color="pink"
                      className={classes.button}
                      startIcon={<DeleteForeverIcon />}
                      type="submit"
                      onClick={handleDeleteSubclubComment.bind(
                        this,
                        comment.id,
                        comment.memberId
                      )}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#6f112b",
                      }}
                    ></Button>

                  <br />
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#6f112b",
                        fontFamily: "Garamond",
                        justifyContent: "center",
                      }}
                    >
                      {comment.memberName}
                    </Typography>
                  </Grid>
                  <br />
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        display: "flex",
                        alignItems: "center",

                        fontFamily: "Garamond",
                        justifyContent: "center",
                      }}
                    >
                      {comment.content}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </div>
        </div>

        <div>
          <br /> <br />
          <PostConsumer>
            {(value) => {
              const { dispatch } = value;
              return (
                <div className={classes.root}>
                  <br />
                  <InputLabel
                    style={{
                      fontFamily: "Garamond",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    htmlFor="content"
                  >
                    POST
                  </InputLabel>
                  <OutlinedInput
                    id="content"
                    value={values.content}
                    onChange={handleChange("content")}
                    labelWidth={160}
                    rows="3"
                    inputProps={{
                      "aria-label": "content",
                    }}
                  />
                  <Button
                    style={{
                      fontFamily: "Garamond",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    type="submit"
                    onClick={handleSubmit.bind(this, dispatch)}
                  >
                    Share Post
                  </Button>
                </div>
              );
            }}
          </PostConsumer>

          <PostConsumer>
            {(value) => {
              const { posts } = value;
              return (
                <div>
                  {posts.map((post) => {
                    if (
                      post.subClubId.toString() === subclubIdInfo.toString()
                    ) {
                      if (!subclubPostsReel.find((o) => o === post)) {
                        setSubclubPostsReel((subclubPostsReel) => [
                          ...subclubPostsReel,
                          post,
                        ]);
                      }
                    }
                  })}
                </div>
              );
            }}
          </PostConsumer>

          <div>
            {/*if ( !validator.isEmpty(subclubPostsReel)) */}
            <br />
            {subclubPostsReel.reverse().map((post) => (
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={15}>
                  <Grid item>
                    <Avatar
                      alt="user-photo"
                      style={{
                        margin: "auto",
                        width: 80,
                        height: 80,
                        backgroundColor: color_list[post.memberId % 10],
                      }}
                    >
                      <Person />
                    </Avatar>
                  </Grid>

                  <Grid item>
                    <div>
                      <Button
                        gutterBottom
                        color="pink"
                        className={classes.button}
                        startIcon={<FavoriteIcon />}
                        onClick={handleUpdateLike.bind(this, post.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#6f112b",
                          fontFamily: "Garamond",
                          justifyContent: "center",
                        }}
                      >
                        {post.likes}
                      </Button>

                      <Button
                        gutterBottom
                        color="pink"
                        className={classes.button}
                        startIcon={<DeleteForeverIcon />}
                        type="submit"
                        onClick={handleDeletePost.bind(
                          this,
                          post.id,
                          post.memberId
                        )}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#6f112b",
                        }}
                      ></Button>
                    </div>

                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#6f112b",
                      }}
                    >
                      {post.memberName}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {post.content}
                    </Typography>

                    {post.postComments.map((comment) => (
                      <Paper className={classes.paperComment}>
                        <Grid container wrap="nowrap" spacing={10} >
                        <Grid item>
                          <Avatar
                            alt="user-photo"
                            style={{
                              margin: "auto",
                              width: 80,
                              height: 80,
                              backgroundColor:
                                color_list[comment.memberId % 10],
                            }}
                          >
                            <Person />
                          </Avatar>
                        </Grid>

                        <Grid item xs>
                          <div>
                            <Button
                              gutterBottom
                              color="pink"
                              className={classes.button}
                              startIcon={<DeleteForeverIcon />}
                              type="submit"
                              onClick={handleDeleteComment.bind(
                                this,
                                comment.id,
                                comment.memberId
                              )}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "#6f112b",
                              }}
                            ></Button>
                          </div>

                          <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "#6f112b",
                      }}
                    >
                      {comment.memberName}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      style={{
                        fontFamily: "Garamond",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {comment.comment}
                    </Typography>


                        </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  </Grid>

                  
                </Grid>
                <Grid>
                    <PostCommentConsumer>
                      {(value) => {
                        const { dispatch } = value;
                        return (
                          <div className={classes.root}>
                            <br />
                            <InputLabel
                              style={{
                                fontFamily: "Garamond",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              htmlFor="comment"
                            >
                              Comment
                            </InputLabel>
                            <OutlinedInput
                              id="comment"
                              onChange={handleComment("comment")}
                              labelWidth={160}
                              rows="3"
                              inputProps={{
                                "aria-label": "comment",
                              }}
                            />
                            <Button
                              type="submit"
                              style={{
                                fontFamily: "Garamond",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={handleSubmitForComment.bind(
                                this,
                                post.id,
                                dispatch
                              )}
                            >
                              Add a comment!
                            </Button>
                          </div>
                        );
                      }}
                    </PostCommentConsumer>
                  </Grid>
              </Paper>
            ))}
          </div>
        </div>

        <div
          style={{
            fontFamily: "Garamond",
            justifyContent: "center",
            alignItems: "center",
          }}
        > 
         <br /> <br />
        {adminId == null || adminId === 0 ? (
            ""
            ) : (  adminId.toString() === userIdInfo.toString() ? ( <div>
              <div className={classes.root}>
                <h4
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#651f33",
                  }}
                >
                  Create an event
                </h4>
                <br />
                <InputLabel
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="application"
                >
                  Event title
                </InputLabel>
                <OutlinedInput
                  id="application"
                  labelWidth={200}
                  value={eventValues.application}
                  onChange={handleChangeEvent("application")}
                  rows="3"
                  inputProps={{
                    "aria-label": "application",
                  }}
                />

                <br />
                <InputLabel
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  htmlFor="link"
                >
                  Event link
                </InputLabel>
                <OutlinedInput
                  id="link"
                  labelWidth={200}
                  value={eventValues.link}
                  onChange={handleChangeEvent("link")}
                  rows="3"
                  inputProps={{
                    "aria-label": "link",
                  }}
                />
              </div>
              <Calendar onChange={onChange} value={value} />
              <br />

              <h5>startTime</h5>
              <div>
                <TimePicker onChange={onChange2} value={value2} />
              </div>

              <h5>finishTime</h5>
              <div>
                <TimePicker onChange={onChange3} value={value3} />
              </div>
              <Button
                type="submit"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                  fontWeight: "bold",
                }}
                onClick={handleSubmitForEvent.bind(this)}
              >
                Add event
              </Button>
            </div>
          ) : (
            ""
          ))}
          <br /> <br />
          <h5>Events</h5>
          {events.map((event) => (
            <Grid item xs={12} md={80}>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {event.application}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Date: {event.startTime.toString().split(" ")[0]}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Time: {event.startTime.toString().split(" ")[1]} -{" "}
                      {event.finishTime.toString().split(" ")[1]}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      {event.link}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          ))}
          <br />
          <br />
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
              <h3
                style={{
                  fontFamily: "Garamond",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#651f33",
                }}
              >
                Members of the {clubname} club
              </h3>
              <div>
                <br />

                {member_ids.map((member) => {
                  {
                    if (member.id !== userIdInfo) {
                      return (
                        <div>
                          <Button
                            gutterBottom
                            color="brown"
                            className={classes.button}
                            startIcon={<ChatIcon />}
                            onClick={messageToUserIdInfoFunc.bind(
                              this,
                              member.id
                            )}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#6f112b",
                              fontFamily: "Garamond",
                            }}
                          ></Button>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Garamond",
                            }}
                          >
                            {member.username}
                            <br />
                            {userIdInfo === adminId ? member.email : ""}
                            {member.id === adminId ? (
                              <h7> (subclub admin)</h7>
                            ) : (
                              ""
                            )}
                          </div>
                          <br />
                        </div>
                        //</h3>
                      );
                    }
                  }
                })}
              </div>
            </Grid>
          </Paper>
          <br />
          <Animation2 pose={isIFrame ? "visible" : "hidden"}>
            <Iframe
              url="http://localhost:3000/privateChat"
              width="300px"
              height="300px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Animation2>
        </div>
      </SplitPane>
    </div>
  );
}
