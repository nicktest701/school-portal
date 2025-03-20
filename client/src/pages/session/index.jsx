import React from "react";
import { Outlet } from "react-router-dom";
import EditSession from "./EditSession";
function Session() {
  return (
    <>
      <Outlet />
      <EditSession />
    </>
  );
}

export default Session;
