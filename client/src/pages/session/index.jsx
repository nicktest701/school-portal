import React from "react";
import { Outlet } from "react-router-dom";
import EditSession from "./EditSession";
import AddSession from "./AddSession";
function Session() {
  return (
    <>
      <Outlet />
      <AddSession />
      <EditSession />
    </>
  );
}

export default Session;
