import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = (props) => {
  const { isAuthedUser } = props; //, type = "private"
  // if (type === "guest" && isAuthedUser) return <Redirect to="/home" />;
  // else
  console.log(props);
  if (!isAuthedUser) return <Redirect to="/login" />; //type === "private" &&

  return <Route {...props} />;
};

export default ProtectedRoute;
