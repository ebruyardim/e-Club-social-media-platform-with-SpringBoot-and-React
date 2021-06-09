import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Input,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Background from "../../images/background/beige-background.jpg";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useHistory } from "react-router-dom";
import UserConsumer from "../../contextUser";
import validator from "validator";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pink: {
    margin: "auto",
    color: "primary.main",
    backgroundColor: "#f98b",
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "200vh",
  },
}));

export function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [Alertopen, setAlertOpen] = useState(false);

  const [textMessage, setTextMessage] = useState("");

  const history = useHistory();

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (dispatch) => {
    if (
      validator.isEmail(values.email) &&
      !validator.isEmpty(values.password) &&
      !validator.isEmpty(values.username) &&
      validator.isLength(values.password, 8)
    ) {
      axios
        .post("http://localhost:8080/member/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data !== -1) {
            console.log("Added user:");
            console.log(values.username);
            dispatch({
              type: "ADD_USER",
              payload: {
                id: response.data,
                username: values.username,
                email: values.email,
                password: values.password,
                isLogin: 0,
                isQuestionnaire: 0,
              },
            });
            history.push("/signin");
          } else {
            setTextMessage("Username or e-mail already taken!");
            handleAlertOpen();
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      console.log("Please fill correctly!");
      setTextMessage(
        "You must enter a valid e-mail adress and minimum password lenght is 8."
      );
      handleAlertOpen();
    }
  };

  return (
    <div className={classes.container} style={{paddingTop: "0px", marginTop: "0",
      position: "absolute",
      top:0,
      left:0,
      width: "100%",


    }}>
      <div>
        <Dialog
          open={Alertopen}
          onClose={handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogTitle>Please fill all fields correctly! </DialogTitle>
            <DialogContentText id="alert-dialog-description">
              {textMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <UserConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className={classes.root}>
              <br></br>
              <div>
                <Avatar className={classes.pink}>
                  <LockIcon />
                </Avatar>
              </div>
              <br></br>
              <div
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                LOVELACE
              </div>
              <br />
              <br />
              <InputLabel
                htmlFor="email"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                E-mail
              </InputLabel>
              <Input
                id="email"
                value={values.email}
                onChange={handleChange("email")}
                type="email"
                inputProps={{
                  "aria-label": "email",
                }}
              />
              <br />
              <InputLabel
                htmlFor="textUsername"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                Username
              </InputLabel>
              <Input
                id="textUsername"
                value={values.username}
                onChange={handleChange("username")}
                inputProps={{
                  "aria-label": "username",
                }}
              />
              <br />

              <InputLabel
                htmlFor="textPassword"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                Password
              </InputLabel>
              <Input
                id="textPassword"
                value={values.password}
                onChange={handleChange("password")}
                type="password"
                inputProps={{
                  "aria-label": "password",
                }}
              />
              <br />

              <Button
                type="submit"
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                  fontWeight: "bold",
                }}
                onClick={handleSubmit.bind(this, dispatch)}
              >
                SIGN UP
              </Button>

              <br />

              <br />
              <Box
                style={{
                  fontFamily: "Garamond",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                Already have an account?
                <Link
                  to="/signin"
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#474747",
                    border: "0px",
                    background: "transparent"
                  }}
                  className="btn btn-primary "
                >
                  Sign in
                </Link>
              </Box>
            </div>
          );
        }}
      </UserConsumer>
    </div>
  );
}
