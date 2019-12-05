import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./container/Home/Home";
import Login from "./container/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import firebase from "./config/firebase";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashBoard from "./container/Dashboard/Dashboard";
import axios from "./axios";

// const API_KEY = process.env.REACT_APP_API_KEY;

// console.log("testing", API_KEY);

class App extends Component {
  state = {
    authenticated: false,
    user: null,
    // uid: null,
    isAdmin: false
  };

  //   firebase.auth().onAuthStateChanged((user) =>{
  //     if (user) {
  //         console.log('This is the user: ', user)
  //     } else {
  //         // No user is signed in.
  //         console.log('There is no logged in user');
  //     }
  // })

  Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("log out was sucessful");
        this.setState({
          authenticated: false,
          user: null,
          isAdmin: false,
          loggedin: false
        });
      });
    //     .catch(error => console.log("error occured"));
  };

  updateUser = user => {
    if (!user) {
      this.setState({ authenticated: false, user: null, uid: null });
    }
  };

  componentDidMount() {
    // const user = firebase.auth().currentUser;
    // if (user) {
    //   user.getIdToken(true).then(idToken => {
    //     axios
    //       .get("/users.json?auth=" + idToken)
    //       .then(response => console.log(response))
    //       .catch(error => console.log(error));
    //   });
    //}
    // console.log("the database is", database);
    firebase.auth().onAuthStateChanged(user => {
      user
        .getIdToken(true)
        .then(idToken => {
          axios
            .get("/users/" + user.uid + ".json", {
              params: {
                auth: idToken
              }
            })
            .then(response =>
              // console.log("the response is", response))
              this.setState({ isAdmin: response.data.isAdmin })
            )
            .catch(error => console.log(error));
          user
            ? this.setState({
                authenticated: true,
                user: user,
                loggedin: true,
                // uid: user.uid,
                token: idToken
              })
            : this.setState({
                authenticated: false,
                user: null,
                loggedin: false,
                token: null
              });
        })
        .catch(error => console.log(error));

      console.log("the user is, ", user);
    });

    //   axios
    //     .get("/users.json?auth=" + user.refreshToken)
    //     .then(response => console.log(response))
    //     .catch(error => console.log(error));
    //   console.log("user is", user.uid);
    //});
  }
  render() {
    console.log(this.state);
    // const user = firebase.auth().currentUser;
    // if (user) {
    //   console.log(user.providerData);
    // }
    // console.log("this", this);
    // let logout = null;
    // const { user } = this.state;
    // if (user) {
    //   logout = <Logout />;
    // }
    return (
      <div className="App">
        <Navbar
          isAdmin={this.state.isAdmin}
          authenticated={this.state.authenticated}
          Logout={this.Logout}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={props => <Home user={this.updateUser} {...props} />}
          />

          {/* <Route path="/login" component={Login} /> */}
          <ProtectedRoute
            authenticated={this.state.authenticated}
            component={DashBoard}
            path="/dashboard"
            type="authenticated"
          />

          <ProtectedRoute
            loggedin={this.state.loggedin}
            component={Login}
            path="/login"
            type="signed in"
          />
        </Switch>

        {/* <Switch>
        <Route path="/ "> */}
        {/* <Home /> */}
        {/* </Route> */}
        {/* <Route path="/login " component={} /> */}
        {/* // </Switch> */}

        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      </div>
    );
  }
}

export default App;
