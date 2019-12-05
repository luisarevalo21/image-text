import React, { Component } from "react";
import axios from "../../axios";
// import Dropdown from "react-dropdown";
// import 'semantic-ui-css/semantic.min.css'
// import "semantic-ui-css/semantic.min.css";
import Select from "react-select";
import classes from "./Dropdown.module.css";
// class DropDown extends Component {
//   state = {
//     activeExGyms: []
//   };
//   //   componentDidMount() {
//   //     axios
//   //       .get("/currentExRaids.json")
//   //       .then(response => {
//   //         console.log("the response is", response.data);
//   //       })
//   //       .catch(error => console.log(error));
//   //   }

const customStyles = {
  option: (provided, state, height = "60px") => ({
    ...provided
    // fontWeight: state.isDisabled ? "bold" : null,
    // color: state.isDisabled ? "black" : null,
    // height: height
  }),
  control: base => ({
    ...base,
    height: 35,
    minHeight: 50,
    cursor: "pointer",
    backgroundColor: "#d1d1d1"
  })
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 1 : 0.5;

  //     return { ...provided, opacity };
  //   }
};

const dropDown = props => {
  return (
    <div className={classes.Layout}>
      <label className={classes.Label}>{props.header}</label>
      <Select
        className={classes.Dropdown}
        options={props.options}
        value={props.selectedOption}
        onChange={props.changed}
        placeholder={props.defaultValue}
        styles={customStyles}
        // value={props.value}
      />
    </div>
  );
};

export default dropDown;
