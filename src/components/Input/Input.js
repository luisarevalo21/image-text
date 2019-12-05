import React from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import classes from "./Input.module.css";
const input = props => {
  const inputClasses = [classes.Input];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let input = null;
  switch (props.type) {
    case "number":
      input = (
        <div className={classes.Layout}>
          <label className={classes.Label}>{props.title}</label>
          <input
            className={inputClasses.join(" ")}
            type="number"
            placeholder={props.placeholder}
            min="1"
            max="40"
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "text":
      input = (
        <div className={classes.Layout}>
          <label className={classes.Label}>{props.title}</label>
          <input
            className={inputClasses.join(" ")}
            type="text"
            placeholder={props.placeholder}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "dropdown":
      input = (
        <div className={classes.Layout}>
          <label className={classes.Label}>{props.title}</label>
          <Dropdown
            className={classes.Dropdown}
            options={props.options}
            //   options={this.state.options}
            value={props.value}
            changed={props.changed}
            defaultValue={props.placeholder}
          />
        </div>
      );
      break;
    case "radio":
      input = props.attendanceOptions.map(element => (
        <div key={element}>
          <label key={element} className={classes.Label}>
            <input
              // className={classes.Label}
              // className={inputClasses.join(" ")}
              type="radio"
              value={element}
              checked={props.checked === element}
              onChange={props.changed}
            />

            <span className={classes.Span}>{element}</span>
          </label>
        </div>
      ));
      input = (
        <div className={classes.Radio}>
          <label className={classes.Label}>{props.title}</label>
          {input}
        </div>
      );

      break;

    case "radio2":
      input = props.passFromFriendOptions.map(element => (
        <div key={element}>
          <label>
            <input
              // className={classes.Label}
              // className={inputClasses.join(" ")}
              type="radio"
              value={element}
              checked={props.checked === element}
              onChange={props.changed}
            />

            <span className={classes.Span}>{element}</span>
          </label>
        </div>
      ));
      input = (
        <div className={classes.Radio}>
          <label className={classes.Label}>{props.title}</label>
          {input}
        </div>
      );

      break;

    case "textarea":
      input = (
        <div className={classes.Layout}>
          <label className={classes.Label}>{props.title}</label>
          <textarea
            placeholder="your answer"
            onChange={props.changed}
            className={classes.TextArea}
          />
        </div>
      );
      break;
      {
        /* </div> */
      }

      // <label>
      //   <input
      //     type="radio"
      //     value="Yes, I will be there."
      //     checked={this.state.selectedAttendance === "Yes, I will be there."}
      //     onChange={this.handleChange}
      //   />
      //   Yes, I will be there.
      // </label>;
      //   input = (
      //     <input
      //       className={inputClasses.join(" ")}
      //       type="radio"
      //       value={props.value}
      //       // placeholder={props.placeholder}
      //       onChange={props.changed}
      //     />
      //   );
      //   break;

      {
        /* <label>
            <input
              className={inputClasses.join(" ")}
              type="radio"
              value={element}
              checked={props.selectedAttendance === element}
              onChange={props.changed}
            >
              element
            </input>
          </label> */
      }
  }

  return <> {input} </>;
};

export default input;
