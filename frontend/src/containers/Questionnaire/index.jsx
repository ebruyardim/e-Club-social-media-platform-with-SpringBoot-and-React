import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Background from "../../images/background/beige-background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  container: {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "2000vh",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

var answersDict = {};

export function Questionnaire() {
  const history = useHistory();
  const userIdInfo = parseInt(JSON.parse(localStorage.getItem("userId")));
  //console.log(userIdInfo);
  const [value, setValue] = React.useState("");
  var clubsList = [];
  const urlOne = "http://localhost:8080/member/updateMember/";
  const urlTwo = userIdInfo.toString();
  const urlThis = urlOne.concat(urlTwo);

  const memberAnswers = "http://localhost:8080/member/addAnswers/" + userIdInfo;

  const handleSubmit = () => {
    var answersList = [];
    var num = 0;
    Object.keys(answersDict).map(
      (key, index) => ((answersList[num] = answersDict[key]), (num += 1))
    );
    console.log(answersDict);
    console.log("list: ");
    console.log(answersList);
    axios.post(memberAnswers, answersList).then((res) => {
      console.log(res);
      axios.post(urlThis).then((response) => {
        console.log(response);
      });
    });

    history.push("/chooseClub");
  };

  const handleChooseClubPage = () => {
    history.push("/chooseClub");
  };

  const handleChange = (q, a, club, event) => {
    setValue(event.target.value);
    answersDict[q.question] = a;
    console.log(answersDict);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/questions").then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const url1 = "http://localhost:8080/member/get/";
  const url2 = userIdInfo.toString();
  const url = url1.concat(url2);

  const [member, setMember] = useState();

  var count = 0;

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log(questions);
  return (
    <>
      <div className={classes.container} style={{paddingTop: "0px", marginTop: "0",
        position: "absolute",
        top:0,
        left:0,
        width: "100%",


      }}>
        <List
          style={{
            fontFamily: "Garamond",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{
                fontFamily: "Garamond",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              QUESTIONNAIRE
            </ListSubheader>
          }
          className={classes.container}
        >
          {questions.map((question) => (
            <>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <p>{++count})</p>
                </ListItemIcon>
                <ListItemText
                  style={{
                    fontFamily: "Garamond",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  primary={question.question}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              {question.answers.map((answer) => (
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon />
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label={answer.reply}
                          name={answer.reply}
                          value={value}
                          onChange={(e) =>
                            handleChange(question, answer, question.club, e)
                          }
                        >
                          <FormControlLabel
                            value={answer.reply}
                            control={<Radio />}
                            label={answer.reply}
                          />
                        </RadioGroup>
                      </FormControl>
                    </ListItem>
                  </List>
                </Collapse>
              ))}
            </>
          ))}
          <Button
            variant="contained"
            style={{
              fontFamily: "Garamond",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={classes.button}
            onClick={handleSubmit.bind()}
          >
            Submit Questionnaire
          </Button>
        </List>

        <p></p>
        <p></p>
      </div>
    </>
  );
}
