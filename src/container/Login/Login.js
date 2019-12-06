import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../config/firebase";
import { Redirect } from "react-router-dom";
import axios from "../../axios";
import classes from "./Login.module.css";
class Login extends Component {
  state = {};
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInSuccessUrl: this.props.location,

    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        console.log("authResult", authResult.additionalUserInfo.isNewUser);

        if (authResult.additionalUserInfo.isNewUser) {
          const newUser = {
            name: authResult.user.displayName,
            email: authResult.user.email,
            uid: authResult.user.uid
          };
          axios
            .patch("/users.json", { [newUser.uid]: newUser })
            .then(response => console.log(response))
            .catch(error => console.log("error occrued", error));
        }

        return true;
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        // return true;
      }
    }
  };

  signInSuccess = () => {
    console.log("theuser is");
    // return <Redirect to="/" />;
  };
  render() {
    // console.log("process ", this.props.history.push());
    return (
      <div className={classes.Login}>
        <h3 className={classes.Header}> Login Page</h3>

        <div>
          <h4 className={classes.Header}>Sign Up with google</h4>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    );
  }
}

export default Login;
