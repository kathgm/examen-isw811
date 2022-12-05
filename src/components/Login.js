import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
//import users from "./../../data/users";
import image from "../assets/images/background.png";
//import authService from "./../service/authService";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ISW-811 - Katherine Granados
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const navigate = useNavigate();

  //   if(authService.isLoggedIn()){

  //     props.history.push("./home");

  //   }

  const classes = useStyles();

  const [account, setAccount] = React.useState({ username: "", password: "" });

  const handelAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);
  };

  const isVarifiedUser = (username, password) => {
    //return users.find((user)=> user.username === username && user.password === password);
    let isValidUser;
    const route = window.location.pathname;

    if (route === "/signup") {
      const qs = require("qs");
      axios
        .post(
          "http://localhost:3000/auth/register?",
          qs.stringify({
            username,
            password,
            grant_type: "password",
            client_id: "null",
            client_secret: "null",
          })
        )
        .then((res) => {
          const datos = res.data;
          console.log("data ", datos);
          if (datos) {
            isValidUser = true;
            sessionStorage.setItem("token", `Bearer ${datos.access_token}`);
            console.log("ok!");
            setTimeout(() => navigate("/login"), 2000);
          } else {
            isValidUser = false;
            console.log("no");
          }
          return isValidUser;
        });
    }
    if (route === "/login") {
      const qs = require("qs");
      axios
        .post(
          "http://localhost:3000/auth/login",
          qs.stringify({
            username,
            password,
            grant_type: "password",
            client_id: "null",
            client_secret: "null",
          })
        )
        .then((res) => {
          const datos = res.data;
          console.log("data ", datos);
          if (datos) {
            isValidUser = true;
            navigate("/home");
            //navigate("/login");
          } else {
            isValidUser = false;
          }
          return isValidUser;
        });
    }
    // const api =
    //   route === "/signup"
    //     ? "http://localhost:3000/auth/register?"
    //     : "http://localhost:3000/auth/login";
  };

  const handelLogin = (e) => {
    e.preventDefault();
    if (isVarifiedUser(account.username, account.password)) {
      //authService.doLogIn(account.username);
      setAccount({ username: "", password: "" });
      //props.history.push("/home");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {window.location.pathname !== "/signup" ? "Log in" : "Sign Up"}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(event) => handelAccount("username", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={(event) => handelAccount("password", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handelLogin(e)}
            >
              {window.location.pathname !== "/signup" ? "Log in" : "Sign Up"}
            </Button>
            {window.location.pathname !== "/signup" ? (
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            ) : null}

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
