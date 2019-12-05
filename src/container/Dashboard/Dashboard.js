import React, { Component } from "react";
import axios from "../../axios";
import firebase from "../../config/firebase";
import classes from "./Dashboard.module.css";
import PopUpComponent from "../../components/PopUpComponent/PopUpComponent";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Dashboard extends Component {
  state = {
    // SubmissionForm: {
    // file: {
    //   value: "",
    //   validation: {
    //     type: "image/png"
    //   },
    //   valid: false,
    //   touched: false,
    //   type: "file",
    //   lastPdfAddTime: ""
    // }
    file: null,
    //},
    url: null,
    progress: 0,
    // loading: false,
    posting: false,
    exDateInformation: null
    // token: null
  };

  checkValdity(value, rules) {
    console.log("the vlaue is", value);
    console.log(rules);
    let isValid = true;
    // if (rules.required) {
    //   isValid = value.trim() !== "" && isValid;
    // }
    // if (rules.minLength) {
    //   isValid = value.length > rules.minLength && isValid;
    // }

    if (rules.type) {
      if (value !== undefined) isValid = value.type === rules.type && isValid;
    }
    // if (rules.minValue) {
    //   isValid = value > rules.minValue && isValid;
    // }
    console.log("is valid is", isValid);

    return isValid;
  }

  completed = () => {
    console.log("completed was triggere");
    this.setState({
      file: undefined,
      url: null,
      progress: 0,
      posting: false,
      exDateInformation: null
    });
  };
  // componentDidMount() {
  //   // const token = firebase.auth().currentUser.getIdToken();
  //   // this.setState({ token });
  // }
  handleChange = event => {
    console.log("THE EVENT IS", event.target.files[0]);
    // const copyData = { ...this.state.SubmissionForm };
    // console.log(copyData);
    // const copyDataElement = { ...copyData["file"] };

    // copyDataElement.touched = true;
    // copyDataElement.value = event.target.files[0];

    // copyDataElement.valid = this.checkValdity(
    //   copyDataElement.value,
    //   copyDataElement.validation
    // );
    // copyData["file"] = copyDataElement;

    // console.log("file changed", event.target.files[0]);
    this.setState({ file: event.target.files[0] });
  };

  fetchTextFromGoogle = async url => {
    let array = [];
    // const { token } = this.state;
    // const { url } = this.state;

    console.log("the url is", url);
    let body = JSON.stringify({
      requests: [
        {
          features: [
            // { type: "LABEL_DETECTION", maxResults: 10 },
            // { type: "LANDMARK_DETECTION", maxResults: 5 },
            // { type: "FACE_DETECTION", maxResults: 5 },
            // { type: "LOGO_DETECTION", maxResults: 5 },
            { type: "DOCUMENT_TEXT_DETECTION" }
            // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
            // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
            // { type: "IMAGE_PROPERTIES", maxResults: 5 },
            // { type: "CROP_HINTS", maxResults: 5 },
            // { type: "WEB_DETECTION", maxResults: 5 }
          ],
          image: {
            source: {
              imageUri: url
            }
          }
        }
      ]
    });
    const key = process.env.REACT_APP_API_KEY;
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" + key,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    );

    let responseJson = await response.json();
    console.log(responseJson);

    console.log(responseJson.responses[0].fullTextAnnotation.text);

    array = responseJson.responses[0].fullTextAnnotation.text.split("\n");

    const startIndex = Object.values(array).indexOf("INVITATION") + 1;
    const myObject = {};

    const dateArray = array[startIndex].split(" ");
    let finalDateArray = [];
    for (let i = 0; i < dateArray.length; i++) {
      if (dateArray[i] === "PM") {
        finalDateArray.push(dateArray[i]);
        break;
      }
      finalDateArray.push(dateArray[i]);
    }

    let monthNumber = months.indexOf(finalDateArray[0]) + 1;
    const dayOfRaid = finalDateArray[1];
    const currentYear = new Date().getFullYear();
    let date = monthNumber + "/" + dayOfRaid + "/" + currentYear;

    let time = finalDateArray[2] + ":00 " + finalDateArray[3];
    console.log(finalDateArray);

    const gymName = array[startIndex + 1];
    const city = array[startIndex + 2].split(",")[0];
    console.log("the gym name is", city);

    myObject.date = date;
    myObject.time = time;
    myObject.gymName = gymName;
    myObject.city = city;
    myObject.imageUrl = url;

    // const token = await firebase.auth().currentUser.getIdToken;

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        axios
          .patch("/currentExRaids.json?auth=" + idToken, {
            [myObject.gymName]: myObject
          })
          .then(response => console.log(response));
      })
      .catch(error => console.log("Error :: " & error.message));
    this.setState({
      exDateInformation: myObject
    });
    // axios
    //   .post(
    //     "/currentExRaids.json?auth=" + token,
    //     { [myObject.gymName]: myObject }
    //     // {
    //     //   headers: {
    //     //     Authorization: token
    //     //   }
    //     //}
    //   )
    //   // {
    //   //   headers: {
    //   //     Authorization: token,
    //   //     "Content-Type": "application/json"
    //   //   }
    //   // }
    //   //  )
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error.response));
  };
  handleClick = () => {
    console.log("submit was triggered ");
    this.setState({ loading: true });
    const { file } = this.state;
    if (file) {
      // this.setState({ posting: true });
      console.log("inside if ");
      const storage = firebase.storage();
      const upLoadTask = storage.ref(`${file.name}`).put(file);
      upLoadTask.on(
        "state_changed",
        snapshot => {
          // progress function ...
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress, posting: true });
        },
        error => {
          // Error function ...
          console.log(error);
        },
        () => {
          storage
            .ref("")
            .child(`${file.name}`)
            .getDownloadURL()
            .then(url => {
              this.setState({ url });
              this.fetchTextFromGoogle(url);
            })
            .catch(error => console.log(error));
        }

        // () => {
        //   this.fetchTextFromGoogle();
        // }
      );
    }
    // } else {
    //   alert("no file please select a png");
    // }
  };
  render() {
    let loadModule = null;
    if (this.state.posting) {
      loadModule = (
        <PopUpComponent
          posting={this.state.posting}
          progress={this.state.progress}
          completed={this.completed}
          // completed={this.handleCompletion}
          // reset={this.handleNewSubmission}
          // handleToggle={this.handleNewSubmission}
        />
      );
    }

    // console.log("the current user is", firebase.auth().currentUser);
    return (
      // <div>
      <div className={classes.Dashboard}>
        <h3 className={classes.Header}>Submit an Ex Pass</h3>
        <input
          type="file"
          onChange={e => this.handleChange(e)}
          accept="image/jpeg, image/png"
          className={classes.Input}
        />

        {/* let loadModule = <PopUpComponent />;{} */}
        <button onClick={this.handleClick} className={classes.Button}>
          Submit
        </button>
        {loadModule}
      </div>
    );
  }
}

export default Dashboard;
