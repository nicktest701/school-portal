import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import SchoolSessionReducer from '../reducers/SchoolSessionReducer';
// import { useQuery } from '@tanstack/react-query';
// import { getAllStudents } from '../../api/studentAPI';

export const SchoolSessionContext = React.createContext();
const SchoolSessionProvider = ({ children }) => {
  const schoolSessionValues = {
    displayAddSession: false,
    currentSession: {},
    subjectsWithScore: [],

    levelFeeInfo: {
      open: false,
      data: {
        level: '',
        term: '',
      },
    },

    generalAlert: {
      message: '',
      severity: '',
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

    editSession: {
      open: false,
      data: {},
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
        name: '',
        code: '',
        isCore: '',
      },
    },
    viewGrades: {
      open: false,
      ratings: [],
    },

    assignGrades: {
      open: false,
      data: { _id: '', name: '', ratings: [] },
    },
    editGrades: {
      open: false,
      data: {
        name: '',
        ratings: [],
      },
    },
    addStudentResults: {
      open: false,
      data: {
        _id: '',
        student: '',
        level: '',
        classScore: '',
        examsScore: '',
        totalScore: '',
        grade: '',
        remarks: '',
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
