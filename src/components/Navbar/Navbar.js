import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logout from "../../container/Logout/Logout";
import { NavLink } from "react-router-dom";
import Dashboard from "../../container/Dashboard/Dashboard";
import NotAdmin from "../NotAdminComponent/NotAdminComponent";

import classes from "./Navbar.module.css";
const navbar = props => {
  console.log("props.authenticated is", props.isAdmin);
  const isAdmin =
    props.isAdmin && props.authenticated ? (
      <NavLink to="/dashboard" className={classes.NavLink}>
        Dashboard
      </NavLink>
    ) : null;

  // <NavLink to="/dashboard">
  //   <NotAdmin />
  // </NavLink>
  {
    /* <Logout /> */
  }

  const logout = props.authenticated ? (
    <Logout Logout={props.Logout} />
  ) : (
    <NavLink to="/login" className={classes.NavLink}>
      Login
    </NavLink>
  );

  // const logout = props.authenticated ? (
  //   <>
  //     <NavLink to="/logout">
  //       <Logout />
  //     </NavLink>
  //   </>
  // ) : null;

  // console.log("AUTHENTICATED IS", authenticated);
  return (
    // <Navbar bg="light" expand="lg">
    //   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <NavLink to="/">Home</NavLink>
    //       {authenticated}

    // </Navbar>

    //   <Navbar bg="light">
    //   <Navbar.Brand href="#home">Brand link</Navbar.Brand>
    // </Navbar>

    // <Navbar bg="light">
    //   <Navbar.Brand>Brand text</Navbar.Brand>
    // </Navbar>

    // <Navbar bg="dark">

    // </Navbar>
    // <br />
    <Navbar
      collapseOnSelect
      expand="md"
      variant="dark"
      className={classes.Navbar}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {/* <Navbar bg="dark" variant="dark"> */}
        <Nav className={classes.Nav}>
          <NavLink to="/" className={classes.NavLink}>
            Home
          </NavLink>
          {isAdmin}
        </Nav>

        {/* <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        React Bootstrap
      </Navbar.Brand> */}
      </Navbar.Collapse>
      {logout}
    </Navbar>
  );
};

export default navbar;
