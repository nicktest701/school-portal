import React, { useReducer } from "react";
import PropTypes from "prop-types";
import SchoolSessionReducer from "../reducers/SchoolSessionReducer";
export const SchoolSessionContext = React.createContext();
const SchoolSessionProvider = ({ children }) => {
  const schoolSessionValues = {
    levelFeeInfo: {
      open: false,
      data: {
        level: "",
        term: "",
      },
    },

    generalAlert: {
      message: "",
      severity: "",
    },
    //message
    messageData: {
      open: false,
      data: {},
    },

    feeEditData: {
      open: false,
      data: {},
    },

    //View  Exams Report
    viewReport: {
      open: false,
      data: {},
    },

    ///quick message
    quickMessageData: {
      open: false,
      data: {},
    },

    //Global alert
    alertData: {
      severity: "info",
      message: "",
    },

    ///Load data from file
    fileData: {
      open: false,
      columns: [],
      data: [],
    },

    addStudentFileData: {
      open: false,
      columns: [],
      data: [],
      type: "",
    },

    viewLevel: {
      open: false,
      data: {},
    },
    editLevel: {
      open: false,
      data: {},
    },

    //
    editSubject: {
      open: false,
      data: {
        name: "",
        code: "",
        isCore: "",
      },
    },

    viewGrades: {
      open: false,
      ratings: [],
    },

    assignGrades: {
      open: false,
      data: { _id: "", name: "", ratings: [] },
    },
    editGrades: {
      open: false,
      data: {
        name: "",
        ratings: [],
      },
    },
    addStudentResults: {
      open: false,
      data: {
        _id: "",
        student: "",
        level: "",
        classScore: "",
        examsScore: "",
        totalScore: "",
        grade: "",
        remarks: "",
      },
      grade: [],
    },
  };
  const [schoolSessionState, schoolSessionDispatch] = useReducer(
    SchoolSessionReducer,
    schoolSessionValues
  );

  return (
    <SchoolSessionContext.Provider
      value={{
        schoolSessionState,
        schoolSessionDispatch,
      }}
    >
      {children}
    </SchoolSessionContext.Provider>
  );
};

SchoolSessionProvider.propTypes = {
  children: PropTypes.node,
};
export default SchoolSessionProvider;
