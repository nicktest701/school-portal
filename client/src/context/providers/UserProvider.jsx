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
    school_info: {
      badge: '',
      name: 'Frebby School Portal',
      address: 'Plot 15,Block D,Kwaprah',
      location: 'Kronum-Kwaprah',
      email: 'frebbytechconsults@gmail.com',
      phonenumber: '0543772591-0560372844-0239602580',
      motto: 'Always at your tech service!',
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
