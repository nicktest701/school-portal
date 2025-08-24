const StudentReducer = (state, action) => {
  switch (action.type) {
    case "editStudent":
      return {
        ...state,
        editStudentData: action.payload,
      };

    case "editParent":
      return {
        ...state,
        editParentData: action.payload,
      };

    case "showCurrentStudentFeeReportView":
      return {
        ...state,
        showCurrentStudentFeeReportView: {
          show: action.payload.show,
          data: action.payload.data,
        },
      };

    case "showCurrentStudentAcademicsReportView":
      return {
        ...state,
        showCurrentStudentAcademicsReportView: {
          show: action.payload.show,
          examsDetails: action.payload.examsDetails,
        },
      };

    case "getReportDetails":
      return {
        ...state,
        studentReportDetails: action.payload,
      };

    case "viewStudentFeeHistory":
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
