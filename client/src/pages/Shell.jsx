import React, { useContext, useEffect, useRef } from 'react';
import { UserContext } from '../context/providers/userProvider';
import _ from 'lodash';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { verifyUser } from '../api/userAPI';

const Shell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDispatch, userState } = useContext(UserContext);

  const schoolSession = useRef(
    JSON.parse(localStorage.getItem('@school_session'))
  );

  const path = location.pathname || '/';

  useEffect(() => {
    userDispatch({ type: 'setLoading' });
    async function getData() {
      try {
        const data = await verifyUser();
        // //console.log(data);
        if (_.isEmpty(data?.id) || _.isEmpty(schoolSession.current)) {
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
            payload: { user: data, session: schoolSession.current },
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
