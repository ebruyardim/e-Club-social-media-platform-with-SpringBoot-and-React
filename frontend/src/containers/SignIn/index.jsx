import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  makeStyles,
  Input,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Background from "../../images/background/beige-background.jpg";
import LockIcon from "@material-ui/icons/Lock";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import auth from "../../auth";

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
export function SignIn(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ username: "", password: "" });
  const history = useHistory();
  const [Alertopen, setAlertOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (e) => {
    if (
      !validator.isEmpty(details.username) &&
      !validator.isEmpty(details.password)
    ) {
      axios
        .post("http://localhost:8080/member/login", {
          username: details.username,
          password: details.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === 103) {
            localStorage.setItem("adminId", JSON.stringify(103));
            auth.isAdmin(() => {});
            history.push("/admin");
          } else if (response.data !== -1) {
            console.log("Logged in user:");
            console.log(details.username);

            localStorage.setItem("userId", JSON.stringify(response.data));
            auth.isAuthenticated(() => {
              //console.log("muUserid: "+JSON.parse(localStorage.getItem("userId")));
            });
            history.push("/profile");
          } else {
            setTextMessage(
              "The username and password you entered did not match our records. Please double-check and try again."
            );
            handleAlertOpen();
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      setTextMessage(
        "The username and password you entered did not match our records. Please double-check and try again."
      );
      handleAlertOpen();
    }
  };

  return (
    <div
      className={classes.container}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Dialog
        open={Alertopen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
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
        htmlFor="name"
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
        id="name"
        name="name"
        onChange={(e) => setDetails({ ...details, username: e.target.value })}
        value={details.username}
        type="name"
        inputProps={{
          "aria-label": "name",
        }}
      />
      <br />
      <InputLabel
        htmlFor="password"
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
        id="password"
        name="password"
        onChange={(e) => setDetails({ ...details, password: e.target.value })}
        value={details.password}
        type="password"
        inputProps={{
          "aria-label": "password",
        }}
      />
      <br />
      <br />
      {error !== "" ? <div className="error">{error}</div> : ""}
      <Box
        style={{
          fontFamily: "Garamond",
          justifyContent: "center",
          alignItems: "center",
          color: "#474747",
        }}
      >
        Forgot your password?
        <Link
          to="/forgotpassword"
          className="btn btn-primary"
          style={{
            fontFamily: "Garamond",
            justifyContent: "center",
            alignItems: "center",
            color: "#632d2d",
            border: "0px",
            background: "transparent",
          }}
        >
          Send an email
        </Link>
      </Box>

      <Button
        type="submit"
        value="LOGIN"
        onClick={handleSubmit}
        style={{
          fontFamily: "Garamond",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Sign in
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
        New to Lovelace?
        <Link
          to="/signup"
          className="btn btn-primary"
          style={{
            fontFamily: "Garamond",
            justifyContent: "center",
            alignItems: "center",
            color: "#5f2a2a",
            border: "0px",
            background: "transparent",
          }}
        >
          Sign up
        </Link>
      </Box>
    </div>
  );
}
