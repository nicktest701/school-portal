import React, { useReducer, useState } from 'react';
import Swal from 'sweetalert2';
import UserReducer from '../reducers/UserReducer';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getAllLevels } from '../../api/levelAPI';
import { getSchoolInfo, verifyUser } from '../../api/userAPI';
import {  useNavigate } from 'react-router-dom';
import Loader from '../../config/Loader';
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const session = JSON.parse(localStorage.getItem('@school_session'));
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',
    profile: '',
    username: '',
    role: '',
  });
  const [school, setSchool] = useState({
    unique: 'school-info',
    badge: '',
    name: 'Frebby School Portal',
    address: 'Plot 15,Block D,Kwaprah',
    location: 'Kronum-Kwaprah',
    email: 'frebbytechconsults@gmail.com',
    phonenumber: '0543772591-0560372844-0239602580',
    motto: 'Always at your tech service!',
  });

  const schoolInfo = useQuery({
    queryKey: ['school-info'],
    queryFn: () => getSchoolInfo(),
    initialData: {
      unique: 'school-info',
      badge: '',
      name: 'Frebby School Portal',
      address: 'Plot 15,Block D,Kwaprah',
      location: 'Kronum-Kwaprah',
      email: 'frebbytechconsults@gmail.com',
      phonenumber: '0543772591-0560372844-0239602580',
      motto: 'Always at your tech service!',
    },
    onSuccess: (data) => {
      setSchool(data);
      localStorage.setItem('@school_info', JSON.stringify(data));
    },
  });

  const usersInfo = useQuery({
    queryKey: ['user', session?.sessionId, session?.termId],
    queryFn: () => verifyUser(),
    enabled: !!session?.sessionId && !!session?.termId,
    placeholderData: {
      id: '',
      profile: '',
      username: '',
      role: '',
    },
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      localStorage.removeItem('@school_session');
      localStorage.removeItem('@user');
      navigate('/login', {
        state: {
          error,
        },
      });
    },
  });

  useQuery({
    queryKey: ['levels', session?.sessionId, session?.termId],
    queryFn: () => getAllLevels(session?.sessionId, session?.termId),
    enabled: !!session?.sessionId && !!session?.termId,
  });

  const initState = {
    isLoading: true,
    session,
    user: user?.data,
    school_info: school,
  };

  const [userState, userDispatch] = useReducer(UserReducer, initState);

  const logInUser = (data) => {
    setUser(data);
    localStorage.setItem('@user', JSON.stringify(data?.token));
  };

  //LOG OUT from System
  const logOutUser = () => {
    Swal.fire({
      title: 'Exiting',
      text: 'Do you want to exit app?',
      showCancelButton: true,
      // backdrop:false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        localStorage.removeItem('@school_session');
        localStorage.removeItem('@user');
        navigate('/login');
      }
    });
  };

  if (schoolInfo?.isLoading || usersInfo?.isLoading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider
      value={{
        userState,
        session,
        user,
        logInUser,
        logOutUser,
        school_info: school,
        userDispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
