import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  authenticated,
  loggedin,
  type,
  ...rest
}) => {
  console.log("TYPE IS", type);
  // console.log("LOGGED IN IS", loggedin);

  switch (type) {
    case "authenticated":
      return (
        <Route
          render={props =>
            authenticated ? <Component {...props} /> : <Redirect to="/" />
          }
          {...rest}
        />
      );

    case "signed in":
      return (
        <Route
          render={props =>
            loggedin ? <Redirect to="/" /> : <Component {...props} />
          }
          {...rest}
        />
      );
  }
};
export default ProtectedRoute;
