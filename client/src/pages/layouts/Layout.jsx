import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Main from './Main';
import Header from './Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
