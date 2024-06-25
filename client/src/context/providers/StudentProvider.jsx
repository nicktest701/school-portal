import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import StudentReducer from '../reducers/StudentReducer';

export const StudentContext = React.createContext();

const StudentProvider = ({ children }) => {
  const session = JSON.parse(localStorage.getItem('@school_session'));

  const studentValues = {
    allStudents: [],
    currentStudentId: '',
    currentLevelId: '',
    studentCurrentLevelId: '',
    currentStudentSubjects: [],
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
        id: '',
        level: '',
        feeId: '',
      },
    },
    ///new student

    newStudent: {
      personal: {
        indexnumber: '',
        firstname: '',
        surname: '',
        othername: '',
        dateofbirth: new Date(),
        gender: '',
        email: '',
        phonenumber: '',
        address: '',
        residence: '',
        nationality: '',
        session: {
          sessionId: session?.sessionId,
          termId: session?.termId,
        },
        isCompleted: false,
      },
      photo: { profile: null, isCompleted: false },
      parent: {
        parent1: {
          firstname: '',
          surname: '',
          gender: '',
          relationship: '',
          email: '',
          phonenumber: '',
          address: '',
          residence: '',
          nationality: '',
        },
        parent2: {
          firstname: '',
          surname: '',
          gender: '',
          relationship: '',
          email: '',
          phonenumber: '',
          address: '',
          residence: '',
          nationality: '',
        },

        isCompleted: false,
      },
      medical: {
        heartDisease: 'No',
        asthma: 'No',
        siezures: 'No',
        visualImpairment: 'No',
        hearingImpairment: 'No',
        physicalDisability: 'No',
        emergencyContact: {
          fullname: '',
          phonenumber: '',
          address: '',
        },

        isCompleted: false,
      },
      academic: {
        level: {
          _id: '',
          type: '',
        },
        previousSchool: {
          name: '',
          location: '',
          report: null,
        },

        isCompleted: false,
      },
      isCompleted: false,
    },
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
