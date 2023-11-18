const StudentReducer = (state, action) => {
  switch (action.type) {
    case 'addNewStudent':
      // eslint-disable-next-line no-case-declarations
      const data = {
        ...state,
        newStudent: {
          ...state.newStudent,
          ...action.payload,
        },
      };

      localStorage.setItem('@student', JSON.stringify(data?.newStudent));

      return data;
    case 'getAllStudents':
      return {
        ...state,
        allStudents: action.payload,
      };

    case 'getCurrentStudentId':
      return {
        ...state,
        currentStudentId: action.payload,
      };

    case 'editStudent':
      return {
        ...state,
        editStudentData: action.payload,
      };

    case 'editParent':
      return {
        ...state,
        editParentData: action.payload,
      };

    case 'getCurrentLevel':
      return {
        ...state,
        currentLevelId: action.payload,
      };
    case 'getStudentCurrentLevelId':
      return {
        ...state,
        studentCurrentLevelId: action.payload,
      };
    case 'getCurrentStudentSubjects':
      return {
        ...state,
        currentStudentSubjects: action.payload,
      };

    case 'showCurrentStudentFeeReportView':
      return {
        ...state,
        showCurrentStudentFeeReportView: {
          show: action.payload.show,
          data: action.payload.data,
        },
      };

    case 'showCurrentStudentAcademicsReportView':
      return {
        ...state,
        showCurrentStudentAcademicsReportView: {
          show: action.payload.show,
          examsDetails: action.payload.examsDetails,
        },
      };

    case 'getReportDetails':
      return {
        ...state,
        studentReportDetails: action.payload,
      };

    case 'viewStudentFeeHistory':
      return {
        ...state,
        viewStudentFeeHistory: {
          open: action.payload?.open,
          data: action.payload?.data,
        },
      };

    default:
      return state;
  }
};

export default StudentReducer;
