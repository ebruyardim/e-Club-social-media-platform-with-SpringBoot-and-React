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
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import validator from "validator";
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

export function ConfirmPassword(props) {
  const classes = useStyles();
  const [details, setDetails] = useState({
    new_password: "",
    confirm_password: "",
  });
  const history = useHistory();
  const [Alertopen, setAlertOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [code, setCode] = useState("");
  const location = useLocation();
  const paramsCode = location.state.params;

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const ChangePassword = (e) => {
    if (
      validator.isLength(details.new_password, 8) &&
      validator.isLength(details.confirm_password, 8)
    ) {
      if (
        details.new_password.toString() ===
          details.confirm_password.toString() &&
        paramsCode.message.toString() === code.toString()
      ) {
        axios
          .post("http://localhost:8080/member/resetPassword", {
            email: paramsCode.to_name,
            password: details.new_password,
          })
          .then((response) => {
            console.log("response of resetPassword:");
            console.log(response.data);
            if (response.data !== -1) {
              history.push("/signin");
            } else {
              setTextMessage(
                "There was an error sending the new password to the database. Please try again."
              );
              handleAlertOpen();
              history.push("/confirmpassword", {
                params: {
                  to_name: paramsCode.to_name,
                  message: paramsCode.message,
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setTextMessage(
          "Please check if passwords are equal or verification code is correct"
        );
        handleAlertOpen();
        history.push("/confirmpassword", {
          params: { to_name: paramsCode.to_name, message: paramsCode.message },
        });
      }
    } else {
      setTextMessage(
        "Please check the lengths of new password and confirm password."
      );
      handleAlertOpen();
      history.push("/confirmpassword", {
        params: { to_name: paramsCode.to_name, message: paramsCode.message },
      });
    }
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
        htmlFor="code"
      >
        Verification Code
      </InputLabel>
      <Input
        id="code"
        onChange={(e) => setCode(e.target.value)}
        inputProps={{
          "aria-label": "text",
        }}
      />

      <InputLabel
        style={{
          fontFamily: "Garamond",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        htmlFor="new_password"
      >
        Password
      </InputLabel>
      <Input
        id="new_password"
        onChange={(e) =>
          setDetails({ ...details, new_password: e.target.value })
        }
        value={details.new_password}
        type="password"
        autoComplete="new_password"
        inputProps={{
          "aria-label": "password",
        }}
      />
      <InputLabel
        style={{
          fontFamily: "Garamond",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        htmlFor="confirm_password"
      >
        Password
      </InputLabel>
      <Input
        id="confirm_password"
        onChange={(e) =>
          setDetails({ ...details, confirm_password: e.target.value })
        }
        value={details.confirm_password}
        type="password"
        autoComplete="confirm_password"
        inputProps={{
          "aria-label": "password",
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
        onClick={ChangePassword}
      >
        SEND
      </Button>
    </form>
  );
}
