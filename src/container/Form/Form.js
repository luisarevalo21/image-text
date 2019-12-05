import React, { Component } from "react";

import Dropdown from "../../components/Dropdown/Dropdown";
import classes from "./Form.module.css";
import Input from "../../components/Input/Input";
import axios from "axios";

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
const gyms = [
  {
    name: "Can You Hear There (Woodfield)",
    listName: "Can You Hear There, Hercules (Lupine Road, Park)"
  },
  {
    "Country Club Vist Park Dedication Plaque":
      "Country Club Vist Park Dedication Plaque, Richmond"
  },
  {
    "Ever Burning Flame": "Ever Burning Flame, Pinole (Fernandez Park)"
  },
  {
    "Fountain of the Bells": "Fountain of the Bells, San Pablo"
  },
  {
    name: "Hazel Downer Thorton Memorial Grove (Dog Park)",
    listName:
      "Hazel Downer Thorton Memorial Grove, Pinole (Pinole Valley dog park)"
  },
  {
    name: "Lamoine (Cheese) Park",
    listName: "Lamoine Park, Richmond (Cheese Park)"
  },
  { name: "Lefty Gomez", listName: "Lefty Gomez Plaque, Rodeo" },
  { name: "Nina Zeitler", listName: "Nina Zeitler" },
  {
    name: "Pinole Point Business Park Fountain A",
    listName: "Pt. Pinole Business Park Fountain, Richmond"
  },
  {
    name: "Pinole Rotary Club (Louis Francis)",
    listName: "Pinole Rotary Club, Pinole (Marlesta Rd)"
  },
  { name: "Pinole Valley Park", listName: "Pinole Valley Park, Pinole" },
  {
    name: "Playground (Refugio)",
    listName: "Playground, Hercules (Refugio Park)"
  },
  {
    name: "Starbucks (Richmond Parkway)",
    listName: "Starbucks, Richmond Parkway location"
  },
  {
    name: "Starbucks (San Pablo Dam Road)",
    listName: "Starbucks, San Pablo Dam Rd. location (El Sob/San Pablo)"
  }
];
class Form extends Component {
  state = {
    // options: [
    //   { value: "Mystic", label: "Mystic" },
    //   { value: "Instinct", label: "Instinct" },
    //   { value: "Valor", label: "Valor" }
    // ],
    // selectedValue: null

    formData: {
      name: {
        value: "",
        type: "text",
        title: "Your name",
        validation: {
          required: true
        },
        placeholder: "name",
        valid: false,
        touched: false
      },
      trainerName: {
        value: "",
        type: "text",
        title: "Pokémon Trainer Name",
        validation: {
          required: true
        },
        placeholder: "Pokémon Trainer Name",
        valid: false,
        touched: false
      },
      level: {
        value: "",
        type: "number",
        title: "Level #",
        validation: {
          required: true,
          maxLength: 2
        },
        placeholder: "Level #",
        valid: false,
        touched: false
      },
      teamName: {
        value: "",
        title: "Team",
        type: "dropdown",
        validation: {},
        placeholder: "Select a team...",
        valid: false
      },

      // attendance: {
      //   value: "",
      //   type: "radio",
      //   validation: {}
      // },

      gymName: {
        value: gyms
          .map(element => element[this.props.selectedGym.value])
          .filter(element => element !== undefined)[0],
        validation: {},
        valid: true
      },
      dateOfRaid: {
        value: this.props.selectedGym.date,
        validation: {},
        valid: true
      },
      timeOfRaid: {
        value: this.props.selectedGym.time,
        validation: {},
        valid: true
      },
      attendance: {
        type: "radio",
        value: "",
        checked: "",
        title: "Will you be attending?",
        attendanceOptions: [
          "Yes, I will be there.",
          "Yes, I will be there. My friend will play for me (enter their name in the comment)",
          "I need someone to play for me (add your telegram name in the comments so an admin can contact you)",
          "No"
        ],
        validation: {}
      },
      passFromFriend: {
        type: "radio2",
        value: "",
        title: "Is your invite from a friend?",
        checked: "",
        passFromFriendOptions: ["Yes", "No"],
        validation: {},
        valid: false
      },
      lateGroup: {
        type: "radio2",
        value: "",
        title: "Would you like to attend the late group?",
        checked: "",
        passFromFriendOptions: ["Yes", "No"],
        validation: {},
        valid: false
      },
      comments: {
        type: "text",
        value: "",
        title: "Comments",
        validation: {},
        valid: true,
        placeholder: "comments"
      }
    },
    formIsValid: false,
    selectedAttendance: ""
    // attendanceOptions: [
    //   "Yes, I will be there.",
    //   "Yes, I will be there. My friend will play for me (enter their name in the comment)"
    // ]
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { formData } = this.state;
    const submissionTime =
      new Date().toLocaleString().split(",")[0] +
      " " +
      new Date().toLocaleTimeString("en-GB");
    console.log(submissionTime);
    const data = {};
    data.submissionTime = submissionTime;
    const url = new URL(
      "https://script.google.com/macros/s/AKfycby8z0GQH8jJjqJW-NUjTRxjCVhdlG81K2akTgiLhOsrNxPyPn0/exec"
    );

    for (let element in formData) {
      data[element] = formData[element].value;
    }
    console.log(data);
    // data.name = formData.name.value;
    // data.level = formData.level.value;
    // data.trainerName = formData.trainerName.value;
    // console.log("the data is", data);
    // const finalData = JSON.stringify(data);
    // console.log("the data is", finalData);
    Object.keys(data).forEach(element =>
      url.searchParams.append(element, data[element])
    );
    try {
      const response = await fetch(url, {
        method: "GET"
      });
      const result = await response.json();
      console.log("Success:", JSON.stringify(result));
    } catch (error) {
      console.error("Error:", error);
    }

    //     const result = await response.json();
    //   console.log('Success:', JSON.stringify(result));
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    // axios
    //   .get(
    //     "https://script.google.com/macros/s/AKfycby8z0GQH8jJjqJW-NUjTRxjCVhdlG81K2akTgiLhOsrNxPyPn0/exec.json",
    //     data
    //   )
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
    console.log("submisison is triggered");
  };

  checkValidity = (value, rules) => {
    console.log("the ruels are", rules);
    console.log("tehv value s", value.length);
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= 2 && isValid;
    }

    console.log("IS VALID IS", isValid);
    return isValid;
  };

  handleChange = event => {
    this.setState({ selectedAttendance: event.target.value });
  };

  handleInputChange = (event, type) => {
    const copyData = { ...this.state.formData };

    // if (type === "level") {
    //   //   event.target.value.length < 2;
    // }

    if (type === "teamName") {
      copyData[type].value = event.value;
    } else if (
      type === "attendance" ||
      type === "passFromFriend" ||
      type === "lateGroup"
    ) {
      copyData[type].value = event.target.value;
      copyData[type].checked = event.target.value;
    } else {
      copyData[type].value = event.target.value;
    }

    copyData[type].touched = true;
    console.log("copy data is", copyData[type].validation);
    copyData[type].valid = this.checkValidity(
      copyData[type].value,
      copyData[type].validation
    );

    let formIsValid = true;
    for (let inputNames in copyData) {
      formIsValid = copyData[inputNames].valid && formIsValid;
    }
    this.setState({ formData: copyData, formIsValid });
  };

  render() {
    console.log("this.state", this.state);

    const formElement = [];

    for (let element in this.state.formData) {
      formElement.push({ id: element, config: this.state.formData[element] });
    }

    // const copy = { ...this.state.formData };
    let input = formElement.map(element => {
      return (
        <Input
          type={element.config.type}
          key={element.id}
          placeholder={element.config.placeholder}
          changed={e => this.handleInputChange(e, element.id)}
          options={this.props.teamOptions}
          invalid={!element.config.valid}
          value={this.props.value}
          touched={element.config.touched}
          attendanceOptions={element.config.attendanceOptions}
          checked={element.config.checked}
          passFromFriendOptions={element.config.passFromFriendOptions}
          title={element.config.title}
        />
      );
    });

    // console.log(this.props.selectedGym);
    // const name = this.props.selectedGym;
    // console.log(
    //   gyms
    //     .map(element => element[this.props.selectedGym])
    //     .filter(element => element !== undefined)
    // );

    // console.log(
    //   new Date().toLocaleString().split(",")[0] +
    //     "" +
    //     new Date().toLocaleTimeString("en-GB")
    // );
    // console.log(
    //   gyms
    //     .map(element => element[name])
    //     .reduce(
    //       (accumulator, currentValue, currentIndex, array) =>
    //         (accumulator = currentValue !== undefined)
    //     ),
    //   {}
    // );
    // const time = new Date();
    // time.format("m/dd/yy  h:MM:ss TT")
    // dateForm(time, "m/dd/yy  h:MM:ss TT");
    // console.log(new Date().toLocaleString("en-GB").replace(/,/g, ""));
    // let input = null;
    // for (let element in this.state.formData) {
    // }
    return (
      <form onSubmit={this.handleSubmit} className={classes.Form}>
        {input}
        <button disabled={!this.state.formIsValid} className={classes.Button}>
          Submit
        </button>

        {/* <div> */}
        {/* <input
          type="radio"
          value="Yes, I will be there."
          onChange={e => this.handleInputChange(e, "attendance")}
        />
        Yes, I will be there.
        <input
          type="radio"
          value="My friend will play for me (enter their name in the comment)"
          onChange={e => this.handleInputChange(e, "attendance")}
        />
        Yes, I will be there. My friend will play for me (enter their name in
        the comment) */}

        {/* <label>
          <input
            type="radio"
            value="Yes, I will be there."
            checked={this.state.selectedAttendance === "Yes, I will be there."}
            onChange={this.handleChange}
          />
          Yes, I will be there.
        </label>
        <label>
          <input
            type="radio"
            value="Yes, I will be there. My friend will play for me (enter their name in the comment)"
            checked={
              this.state.selectedAttendance ===
              "Yes, I will be there. My friend will play for me (enter their name in the comment)"
            }
            onChange={this.handleChange}
          />
          Yes, I will be there. My friend will play for me (enter their name in
          the comment)
        </label> */}
        {/* </div> */}
      </form>
    );
  }
}

export default Form;
{
  /* <Dropdown
          options={this.props.teamOptions}
          //   options={this.state.options}
          value={this.props.value}
          changed={this.props.changed}
          defaultValue="Select a team..."
        /> */
}
{
  /* <input
          type="text"
          placeholder="name"
          onChange={e => this.handleInputChange(e, "name")}
        />
        <input
          type="text"
          placeholder="trainer name"
          onChange={e => this.handleInputChange(e, "trainerName")}
        />
        <input
          type="number"
          placeholder="level"
          min="1"
          max="40"
          onChange={e => this.handleInputChange(e, "level")}
        /> */
}
