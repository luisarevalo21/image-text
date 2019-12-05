import React from "react";
import classes from "./Logout.module.css";
// import firebase from "../../config/firebase";

// import { Redirect } from "react-router-dom";

const logout = props => {
  // state = {
  //   redirect: false
  // };

  // handleLogout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => {
  //       console.log("log out was sucessful");
  //       this.setState({ redirect: true });
  //     })
  //     .catch(error => console.log("error occured"));
  // };

  // if (this.state.redirect) {
  //   // console.log(this.props.history("/"));
  //   // this.props.history("/");
  //   return <Redirect to="/" />;
  // }
  return (
    <button onClick={props.Logout} className={classes.Button}>
      Logout
    </button>
  );
};

export default logout;
