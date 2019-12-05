import React, { Component } from "react";
import firebase from "../../config/firebase";
import axios from "../../axios";
import PopUpComponent from "../../components/PopUpComponent/PopUpComponent";
class Test extends Component {
  state = {
    posting: false,
    progress: 0
  };

  handleClick = () => {
    console.log("buttonw as pressed");
    this.setState((state, props) => {
      return { posting: !state.posting };
    });
  };
  // axios
  //   .get("/test.json?token=PoYdp0WotOalsfi5AZhO7eJY5ey2")
  //   .then(response => console.log(response))
  //   .catch(error => console.log("error", error));

  // const uid = firebase.auth().currentUser;
  // axios
  //   .get("/test.json?auth=" + uid)
  //   .then(response => console.log(response))
  //   .catch(error => console.log("error", error));

  //   const currentUser = firebase.auth().currentUser;

  //   currentUser
  //     .getIdToken(true)
  //     .then(idToken => {
  //       console.log("the idtokenn is", idToken);
  //       axios
  //         .get("/users/" + currentUser.uid + ".json", {
  //           params: {
  //             auth: idToken
  //           }
  //         })
  //         .then(response => console.log(response));
  //     })
  //     .catch(error => console.log("Error :: " & error.message));
  // };

  render() {
    // console.log("this.state", this.state);
    // let module = (
    //   <PopUpComponent
    //     posting={this.state.posting}

    //     // progress={this.state.progress}
    //   />
    // );

    return (
      <>
        <div>
          <button onClick={this.handleClick}>submit</button>
          {module}
          {/* <progress
          className="uploadProgress"
          value={this.state.progress}
          max="1.0"
        /> */}
        </div>
      </>
    );
  }
}

export default Test;
