import React from "react";
import PropTypes from "prop-types";

import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      {/* <main style={{ backgroundColor: "whitesmoke" }}>{children}</main>
      <Footer /> */}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
