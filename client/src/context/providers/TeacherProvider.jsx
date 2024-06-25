import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import TeacherReducer from '../reducers/TeacherReducer';

export const TeacherContext = React.createContext();
const TeacherProvider = ({ children }) => {
  const teacherValues = {
    viewTeacherData: {
      open: false,
      data: {},
    },
    editTeacherData: {
      open: false,
      data: {},
    },

    assignTeacherCourse: {
      open: false,
      data: {
        id: '',
      },
    },
    

    alertData: {
      severity: '',
      message: '',
    },
  };
  const [teacherState, teacherDispatch] = useReducer(
    TeacherReducer,
    teacherValues
  );

  return (
    <TeacherContext.Provider value={{ teacherState, teacherDispatch }}>
      {children}
    </TeacherContext.Provider>
  );
};
TeacherProvider.propTypes = {
  children: PropTypes.node,
};

export default TeacherProvider;
