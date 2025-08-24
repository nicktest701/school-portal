import React, { useReducer } from "react";
import PropTypes from "prop-types";
import StudentReducer from "../reducers/StudentReducer";

export const StudentContext = React.createContext();

const StudentProvider = ({ children }) => {
  const studentValues = {

    showCurrentStudentFeeReportView: {
      show: false,
      data: [],
    },
    showCurrentStudentAcademicsReportView: {
      show: false,
      examsDetails: {},
    },

    //current student fee info
    viewStudentFeeHistory: {
      open: false,
      data: {
        id: "",
        level: "",
        feeId: "",
      },
    },
    ///new student

    ///Edit Student data
    editStudentData: {
      open: false,
      data: {},
    },
    //parent
    editParentData: {
      open: false,
      data: {},
    },

    //get All report details
    studentReportDetails: {
      subjects: [],
      results: [],
    },
  };
  const [studentState, studentDispatch] = useReducer(
    StudentReducer,
    studentValues
  );

  return (
    <StudentContext.Provider value={{ studentState, studentDispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

StudentProvider.propTypes = {
  children: PropTypes.node,
};

export default StudentProvider;
