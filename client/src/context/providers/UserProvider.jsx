import React, { useReducer } from 'react';
import UserReducer from '../reducers/UserReducer';
import PropTypes from 'prop-types';
export const UserContext = React.createContext();




const UserProvider = ({ children }) => {
  const initState = {
    isLoading: true,
    session: {
      sessionId: '',
      termId: '',
      to: '',
      from: '',
      academicYear: '',
      term: '',
      reOpeningDate: '',
      vacationDate: '',
    },
    user: {
      id: '',
      profile: '',
      username: '',
      role: '',
    },
  };

  const [userState, userDispatch] = useReducer(UserReducer, initState);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
