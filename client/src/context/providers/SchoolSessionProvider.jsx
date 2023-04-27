import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import SchoolSessionReducer from '../reducers/SchoolSessionReducer';

export const SchoolSessionContext = React.createContext();
const SchoolSessionProvider = ({ children }) => {
  const schoolSessionValues = {
    displayAddSession: false,
    currentSession: {},
    currentLevel: [],
    subjectsWithScore: [],
    sessionEditData: [],

    levelFeeInfo: {
      open: false,
      data: {
        level: '',
        term: '',
      },
    },

    //message
    messageData: {
      open: false,
      data: {},
    },
    //Receipt
    feesReceiptData: {
      open: false,
      data: {},
    },

    feeEditData: {
      open: false,
      data: {},
    },
    //view fees history
    studentFeesHistoryId: '',

    //View exams record
    examsRecord: {
      open: false,
      id: '',
    },

    //exams score
    examsScore: {
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
      severity: 'info',
      message: '',
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
      type: '',
    },

    //User Information
    userViewData: {
      open: false,
      data: {},
    },

    userEditData: {
      open: false,
      data: {},
    },

    ///fee details to be print
    feePrintData: {},
  };
  const [schoolSessionState, schoolSessionDispatch] = useReducer(
    SchoolSessionReducer,
    schoolSessionValues
  );

  return (
    <SchoolSessionContext.Provider
      value={{ schoolSessionState, schoolSessionDispatch }}
    >
      {children}
    </SchoolSessionContext.Provider>
  );
};

SchoolSessionProvider.propTypes = {
  children: PropTypes.node,
};
export default SchoolSessionProvider;
