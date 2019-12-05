import React, { Component } from "react";
import vision from "react-cloud-vision-api";
import firebase from "../../config/firebase";
import image from "../../assets/images/myphoto.jpg";
import FileBase64 from "react-file-base64";
import axios from "../../axios";
import DropDown from "../../components/Dropdown/Dropdown";
import classes from "./Home.module.css";
import Form from "../../container/Form/Form";

// import firebase from "../../config/firebase";
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];
class Home extends Component {
  state = {
    response: null,
    image: image,
    exDateInformation: null,
    activeExGymOptions: [],
    selectedGymOption: null,
    selectedTeam: null,
    teamOptions: [
      { value: "Mystic", label: "Mystic" },
      { value: "Instinct", label: "Instinct" },
      { value: "Valor", label: "Valor" }
    ]
    // selectedValue: null
  };

  //   const vision = require('react-cloud-vision-api')
  // vision.init({auth: 'YOUR_API_KEY'})
  // const req = new vision.Request({
  //   image: new vision.Image({
  //     base64: base64Img,
  //   }),
  //   features: [
  //     new vision.Feature('TEXT_DETECTION', 4),
  //     new vision.Feature('LABEL_DETECTION', 10),
  //   ]
  // })

  //   handleClick = async () => {
  //     // const req = new vision.Request({
  //     //   image: new vision.Image({
  //     //     base64: image
  //     //   }),
  //     //   features: [
  //     //     new vision.Feature("TEXT_DETECTION")
  //     //     // new vision.Feature("LABEL_DETECTION", 10)
  //     //   ]
  //     // });
  //     // console.log("req is", req);
  //     let array = [];
  //     const { url } = this.state;
  //     let body = JSON.stringify({
  //       requests: [
  //         {
  //           features: [
  //             // { type: "LABEL_DETECTION", maxResults: 10 },
  //             // { type: "LANDMARK_DETECTION", maxResults: 5 },
  //             // { type: "FACE_DETECTION", maxResults: 5 },
  //             // { type: "LOGO_DETECTION", maxResults: 5 },
  //             { type: "DOCUMENT_TEXT_DETECTION" }
  //             // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
  //             // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
  //             // { type: "IMAGE_PROPERTIES", maxResults: 5 },
  //             // { type: "CROP_HINTS", maxResults: 5 },
  //             // { type: "WEB_DETECTION", maxResults: 5 }
  //           ],
  //           image: {
  //             source: {
  //               imageUri: url
  //             }
  //           }
  //         }
  //       ]
  //     });
  //     let response = await fetch(
  //       "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDC3ApKxjcjwBVdyVyFKE7N3VOeyEMjY34",
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },
  //         method: "POST",
  //         body: body
  //       }
  //     );
  //     let responseJson = await response.json();
  //     console.log(responseJson);

  //     console.log(responseJson.responses[0].fullTextAnnotation.text);

  //     array = responseJson.responses[0].fullTextAnnotation.text.split("\n");

  //     const startIndex = Object.values(array).indexOf("INVITATION") + 1;
  //     const myObject = {};

  //     const dateArray = array[startIndex].split(" ");
  //     let finalDateArray = [];
  //     for (let i = 0; i < dateArray.length; i++) {
  //       if (dateArray[i] === "PM") {
  //         finalDateArray.push(dateArray[i]);
  //         break;
  //       }
  //       finalDateArray.push(dateArray[i]);
  //     }

  //     console.log(finalDateArray);

  //     const gymName = array[startIndex + 1];
  //     const city = array[startIndex + 2].split(",")[0];
  //     console.log("the gym name is", city);

  //     myObject.date = finalDateArray;
  //     myObject.gymName = gymName;
  //     myObject.city = city;

  //     axios
  //       .post("/currentExRaids.json", myObject)
  //       .then(response => console.log(response))
  //       .catch(error => console.log(error));
  //     this.setState({
  //       exDateInformation: myObject
  //     });
  //   };

  //   getFiles = image => {
  //     this.setState({ completedFile: image });
  //   };

  //   convert = () => {
  //     storage
  //       .child("IMG_9321.PNG")
  //       .getDownloadURL()
  //       .then(url => this.setState({ url }));

  //     // base64.base64(image, function(err, data) {
  //     //   console.log("the dataiss ", data);
  //     // });
  //   };
  //   handleImageChange = e => {
  //     e.preventDefault();
  //     let file = e.target.files[0];
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       this.setState({
  //         file: file,
  //         base64: reader.result
  //       });
  //     };
  //   };

  //   componentDidUpdate(state) {
  //     console.log("the state ism", state);
  //     console.log("the current state is", this.state);
  //     if (state !== this.state) {
  //       //   this.fetchActiveExGyms();
  //     }
  //   }

  fetchActiveExGyms = () => {
    // if (firebase.auth().currentUser)
    //   firebase
    //     .auth()
    //     .currentUser.getIdToken(true)
    //     .then(idToken => {

    // const user = firebase.auth().currentUser;
    // console.log("CURRENT USER IS, ", user);

    // if (user) {
    //   user.getIdToken(true).then(idToken => {
    //     axios
    //       .get("/users.json?auth=" + idToken + "/uid=" + user.uid)
    //       .then(response => console.log(response))
    //       .catch(error => console.log(error));
    //   });
    // }

    axios
      .get("/currentExRaids.json")
      .then(response => {
        console.log("the response is", response.data);

        const activeExGymOptions = Object.keys(response.data).map(element => {
          return {
            id: element,
            value: response.data[element].gymName,
            label: response.data[element].gymName,
            date: response.data[element].date,
            time: response.data[element].time,
            city: response.data[element].city,
            imageUrl: response.data[element].imageUrl
          };
        });

        this.setState({ activeExGymOptions });
      })
      .catch(error => console.log(error));
    //});

    //   .then(error => console.log(error));
    // }).then(error=>console.log(error)

    // const currentUser = firebase.auth().currentUser;
    // if (currentUser)
    // currentUser
    //   .getIdToken(true)
    //   .then(idToken => {
    //     console.log("the id token is", idToken);
    //     axios.get("/currentExRaids.json?auth=" + idToken).then(response => {
    //       console.log("the response is", response.data);

    //       const activeExGymOptions = Object.keys(response.data).map(element => {
    //         return {
    //           id: element,
    //           value: response.data[element].gymName,
    //           label: response.data[element].gymName,
    //           date: response.data[element].date,
    //           city: response.data[element].city,
    //           imageUrl: response.data[element].imageUrl
    //         };
    //       });
    //       console.log("the options are", activeExGymOptions);
    //       this.setState({ activeExGymOptions });
    //     });
    //   this.setState({ options: response.data });
  };
  componentDidMount() {
    this.fetchActiveExGyms();
    // const currentUser = firebase.auth().currentUser;
    // this.props.user(currentUser);
    // console.log(currentUser);
    // if (currentUser)
    //   currentUser
    //     .getIdToken(true)
    //     .then(idToken => {
    //       axios.get("/currentExRaids.json?auth=" + idToken).then(response => {
    //         console.log("the response is", response.data);
    //         const activeExGymOptions = Object.keys(response.data).map(
    //           element => {
    //             return {
    //               id: element,
    //               value: response.data[element].gymName,
    //               label: response.data[element].gymName,
    //               date: response.data[element].date,
    //               city: response.data[element].city,
    //               imageUrl: response.data[element].imageUrl
    //             };
    //           }
    //         );
    //         console.log("the options are", activeExGymOptions);
    //         this.setState({ activeExGymOptions });
    //       });
    //       // this.setState({ options: response.data });
    //     })
    //     .catch(error => console.log(error));
  }
  // this.handleSubmit()

  handleChange = (event, selectedOption) => {
    console.log("the name is", event);
    console.log("the name is", selectedOption);

    this.setState({ [selectedOption]: event });
  };
  render() {
    // console.log("this.state", this.state.googleResponse);
    // const { exDateInformation } = this.state;
    const { selectedGymOption } = this.state;
    let exImage = null;
    let form = null;
    if (selectedGymOption) {
      exImage = (
        <img src={selectedGymOption.imageUrl} className={classes.Image} />
      );
      form = (
        <Form
          teamOptions={this.state.teamOptions}
          changed={e => this.handleChange(e, "selectedTeam")}
          value={this.state.selectedTeam}
          selectedGym={this.state.selectedGymOption}
        />
      );
    }

    // let module = null;
    // if (true) {
    //   module = <PopUpComponent posting={true} />;
    // }

    return (
      <div>
        <h1 className={classes.Header}>Ex Raid Sign Up</h1>

        <div className={classes.Dropdown}>
          <DropDown
            options={this.state.activeExGymOptions}
            value={this.state.selectedGymOption}
            changed={e => this.handleChange(e, "selectedGymOption")}
            header="Active Ex Raids"
            //   value={this.state.selectedValue}
          />
        </div>
        {exImage}
        {form}
        {/* <Test /> */}

        {/* {module} */}
      </div>
    );
  }
}
{
  /* <FileBase64 multiple={false} onDone={() => this.getFiles()} />) */
}
{
  /* <input type="file" onChange={this.handleImageChange} />
        <button onClick={this.handleClick}> submit</button>
        <button onClick={this.convert}>convert </button> */
}

export default Home;
// if (selectedValue) {
//   console.log(selectedValue.imageUrl);
//   exImage = <img src={selectedValue.imageUrl} />;
// }
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];
// const { googleResponse } = this.state;
// let array = [];
// if (googleResponse) {
//   console.log(googleResponse.responses[0].fullTextAnnotation.text);

//   array = googleResponse.responses[0].fullTextAnnotation.text.split("\n");

//   const startIndex = Object.values(array).indexOf("INVITATION") + 1;
//   const myObject = {};

//   const dateArray = array[startIndex].split(" ");
//   let finalDateArray = [];
//   for (let i = 0; i < dateArray.length; i++) {
//     if (dateArray[i] === "PM") {
//       finalDateArray.push(dateArray[i]);
//       break;
//     }
//     finalDateArray.push(dateArray[i]);
//   }

//   console.log(finalDateArray);

//   const gymName = array[startIndex + 1];
//   const city = array[startIndex + 2].split(",")[0];
//   console.log("the gym name is", city);

//   myObject.date = finalDateArray;
//   myObject.gymName = gymName;
//   myObject.city = city;
//   monthInformation.map(element => console.log(element));
// console.log("the array is", array[index]);

//   const myArray = myObject[0].split(" ");
//   console.log("my array is ", myObject);
//   console.log(Object.values(array).indexOf("INVITATION"));

//   for (let element in array) {
//     console.log(array[element]);
//     //   if(array[element].indexof)
//   }
//   const copy = [...array];
//   console.log(typeof copy);
//}
// if (googleResponse) {
//   let month = "";
//   let day = "";
//   let time = "";

//   const values = Object.values(googleResponse.responses[0])[0];

//   for (let index = 6; index < 19; index++) {
//     console.log(values[index]);
//     if (months.includes(values[index].description)) {
//       month = values[index].description;
//     }
//     if (!isNaN(values[index].description)) {
//       day = values[index].description;
//     }
//   }

//   console.log("month and day are", month, day);
//   Object.values(values).map(element => {
//     if (months.includes(element.description)) {
//       month = element.description;
//     }
//   });
//   console.log("the date is", month);

//   console.log(
//     Object.values(googleResponse.responses[0])[0].map(element => element)
//   );
// .map(element => console.log("the elmenet is", element[0].description));

// console.log(googleResponse.responses[0].textAnnotations[6].description);
// googleResponse[element].map(element =>
//   console.log(
//     element.textAnnotations.map(el => console.log("el is", el))
//   )
// );
