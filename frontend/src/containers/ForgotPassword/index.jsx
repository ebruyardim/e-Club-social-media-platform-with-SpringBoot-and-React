import React, { useState } from "react";
import {
  Avatar,
  Button,
  makeStyles,
  Input,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import emailjs from "emailjs-com";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Background from "../../images/background/beige-background.jpg";

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
    height: "100vh",
    paddingTop: "0px",
    marginTop: "0",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

export function ForgotPassword(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({ email: "" });
  const history = useHistory();
  const [Alertopen, setAlertOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/member/resetPasswordCheckEmail", {
        email: details.email,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === "SUCCESS") {
          const min = 100000;
          const max = 999999;
          const rand = min + Math.random() * (max - min);
          let templateParams = {
            to_name: details.email,
            message: parseInt(rand),
          };
          emailjs.send(
            "gmail",
            "template_l2mt96g",
            templateParams,
            "user_SqJJUdKVU5fLpz4vjSc4i"
          );
          history.push("/confirmpassword", { params: templateParams });
        } else {
          setTextMessage("Please enter existing email.");
          handleAlertOpen();
        }
      })
      .catch((error) => {
        console.log(error);
        setTextMessage("Please enter existing email.");
        handleAlertOpen();
      });
  };

  return (
    <form className={classes.container}>
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
      <InputLabel
        style={{
          fontFamily: "Garamond",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        htmlFor="user_email"
      >
        E-mail
      </InputLabel>
      <Input
        id="email"
        name="user_email"
        type="email"
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
        value={details.email}
        inputProps={{
          "aria-label": "email",
        }}
      />
      <br />
      <br />
      <Button
        type="button"
        style={{
          fontFamily: "Garamond",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={sendEmail}
      >
        SEND
      </Button>
    </form>
  );
}
