import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import ClubConsumer from "../../contextClub";
import Logo from "../../images/logo/logo_transparent.png";
import Background from "../../images/background/beige-background.jpg";
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
import './index.css';

const useStyles = makeStyles((theme) => ({
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
    height: "800vh",
  },
}));

export function HomePage(props) {
  const classes = useStyles();
  const img = [
    Technology,
    Travel,
    Book,
    Dance,
    Music,
    CinemaTheatre,
    Sports,
    Health,
    FashionBeauty,
    Art,
  ];

  return (
    <ClubConsumer>
      {(value) => {
        const { clubs } = value;
        return (
          <div className={classes.container} style={{paddingTop: "0px", marginTop: "0",
            position: "absolute",
            top:0,
            left:0,
            width: "100%",


          }}>
            <img src={Logo} alt="Logo" width="400" height="400"></img>
            <Container maxWidth="sm">
              <h4
                style={{
                  fontFamily: "Garamond",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#474747",
                }}
              >
                LOVELACE, a safe social e-club suitable for people's interests,
                where they can have a good time, is waiting for your comments,
                ratings, and posts! Join the family!
              </h4>
              <br />
              <h3
                style={{
                  fontFamily: "Garamond",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#821432",
                }}
              >
                LET THE FUN BEGIN WITH LOVELACE!
                <br />
              </h3>
            </Container>
            <br />
            <Grid>
              <Link
                to="/signup"
                className="btn btn-primary"
                style={{ textDecoration: "none",
                  border: "0px",
                  background: "transparent"}}
              >
                <div
                  style={{
                    fontFamily: "Garamond",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#651f33",
                    border: "0px",
                    background: "transparent"
                  }}
                >
                  JOIN NOW
                </div>
              </Link>
            </Grid>
            <br />
            <Grid>
              <Link
                to="/signin"
                className="btn btn-primary"
                style={{ textDecoration: "none",
                  border: "0px",
                  background: "transparent"}}
              >
                <div
                  style={{
                    fontFamily: "Garamond",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#651f33",
                  }}
                >
                  SIGN IN
                </div>
              </Link>
            </Grid>

            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {clubs.map((club) => (
                  <Grid item key={club.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={img[clubs.indexOf(club)]}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={{
                            fontFamily: "Garamond",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#6f112b",
                          }}
                        >
                          {club.name.toUpperCase()}
                        </Typography>
                        <Typography
                          style={{
                            display: "flex",
                            fontFamily: "Garamond",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {club.clubInfo}
                        </Typography>
                        <br />
                        <h5
                          style={{
                            display: "flex",
                            fontFamily: "Garamond",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#6f112b",
                          }}
                        >
                          {" "}
                          SUBCLUBS:
                        </h5>
                        {club.subClubs.map((subClub) => (
                          <li
                            key={subClub.id}
                            style={{
                              display: "flex",
                              fontFamily: "Garamond",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {subClub.name}
                          </li>
                        ))}
                        <br />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
        );
      }}
    </ClubConsumer>
  );
}
