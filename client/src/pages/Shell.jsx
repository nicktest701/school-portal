import React, { useContext, useRef, useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { UserContext } from '../context/providers/userProvider';

export default function Shell({ children }) {
  Shell.propTypes = {
    children: PropTypes.node,
  };

  const location = useLocation();
  const { userState, userDispatch } = useContext(UserContext);

  const schoolSession = useRef(
    JSON.parse(localStorage.getItem('@school_session'))
  );

  useEffect(() => {
    if (_.isEmpty(schoolSession.current)) {
      userDispatch({
        type: 'unsetSession',
      });
      // navigate(location.pathname);
       return;
    }
    userDispatch({
      type: 'setSession',
      payload: schoolSession.current,
    });
    // navigate('/');
  }, [schoolSession.current]);

  return _.isEmpty(userState.session) ? (
    <Navigate to='school-session' state={{ path: location.pathname }} />
  ) : _.isEmpty(userState.user) ? (
    <Navigate to='/login' state={{ path: location.pathname }} />
  ) : (
    children
  );
}
