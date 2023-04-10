import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/providers/userProvider';
import _ from 'lodash';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { verifyUser } from '../api/userAPI';

const Shell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDispatch } = useContext(UserContext);

  const schoolSession = JSON.parse(localStorage.getItem('@school_session'));
  const path = location.pathname || '/';

  useEffect(() => {
    //Set default loading
    userDispatch({ type: 'setLoading' });

    //Get user information
    async function getData() {
      try {
        const data = await verifyUser();
        //  console.log(data);
        if (_.isEmpty(data?.id) || _.isEmpty(schoolSession)) {
          userDispatch({
            type: 'signOut',
          });
          navigate('/login', {
            state: { path },
            replace: true,
          });
        } else {
          userDispatch({
            type: 'signIn',
            payload: { user: data, session: schoolSession },
          });

          navigate(path, {
            replace: true,
          });
        }
      } catch (error) {
        navigate('/login', {
          replace: true,
          state: { error },
        });
      }
    }
    getData();

    return () => getData;
  }, [location.pathname]);

  return <Outlet />;
};

export default Shell;
