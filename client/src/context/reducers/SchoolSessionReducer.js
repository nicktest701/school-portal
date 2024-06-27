import _ from 'lodash';

const SchoolSessionReducer = (state, { type, payload }) => {
  switch (type) {
    case 'displayAddSession':
      return {
        ...state,
        displayAddSession: payload,
      };
    case 'setCurrentSession':
      return {
        ...state,
        currentSession: payload,
      };

    case 'subjectsWithScore':
      return {
        ...state,
        subjectsWithScore: payload,
      };

    case 'setFeesReceiptData':
      return {
        ...state,
        feesReceiptData: payload,
      };

    case 'setFeeEditData':
      return {
        ...state,
        feeEditData: payload,
      };

    case 'setStudentFeesHistoryId':
      return {
        ...state,
        studentFeesHistoryId: payload,
      };

    case 'printFees':
      return {
        ...state,
        feePrintData: payload,
      };

    case 'openAddExamsScore':
      return {
        ...state,
        examsScore: payload,
      };

    case 'openViewExamsRecord':
      return {
        ...state,
        examsRecord: payload,
      };
    case 'openViewReport':
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          open: true,
        },
      };
    case 'closeViewReport':
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          open: false,
        },
      };
    case 'setReportData':
      return {
        ...state,
        viewReport: {
          ...state.viewReport,
          data: payload,
        },
      };

    case 'sendQuickMessage':
      return {
        ...state,
        quickMessageData: payload,
      };

    case 'showAlert':
      return {
        ...state,
        alertData: payload,
      };
    case 'closeAlert':
      return {
        ...state,
        alertData: {
          ...state.alertData,
          message: '',
        },
      };

    case 'openFileDialog':
      return {
        ...state,
        fileData: {
          open: true,
          columns: _.uniq(payload?.flatMap(Object.keys)),
          data: payload,
        },
      };
    case 'closeFileDialog':
      return {
        ...state,
        fileData: {
          open: false,
          columns: [],
          data: [],
        },
      };

    case 'openAddStudentFileDialog':
      // console.log(payload.data)
      return {
        ...state,
        addStudentFileData: {
          open: true,
          columns: _.uniq(payload.data?.flatMap(Object.keys)),
          data: payload.data ?? [],
          type: payload.type,
        },
      };
    case 'closeAddStudentFileDialog':
      return {
        ...state,
        addStudentFileData: {
          open: false,
          columns: [],
          data: [],
          type: '',
        },
      };

    case 'viewUser':
      return {
        ...state,
        userViewData: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'editUser':
      return {
        ...state,
        userEditData: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'viewLevelFeeInfo':
      return {
        ...state,
        levelFeeInfo: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'viewMessage':
      return {
        ...state,
        messageData: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'openGeneralAlert':
      return {
        ...state,
        generalAlert: payload,
      };

    case 'editSession':
      return {
        ...state,
        editSession: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'viewLevel':
      return {
        ...state,
        viewLevel: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'editLevel':
      return {
        ...state,
        editLevel: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'editSubject':
      return {
        ...state,
        editSubject: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'viewGrade':
      return {
        ...state,
        viewGrades: {
          open: payload.open,
          ratings: payload.data,
        },
      };

    case 'editGrade':
      return {
        ...state,
        editGrades: {
          open: payload.open,
          data: payload.data,
        },
      };

    case 'assignGrade':
      return {
        ...state,
        assignGrades: {
          open: payload.open,
          data: payload.data,
        },
      };
    case 'addStudentResults':
      return {
        ...state,
        addStudentResults: payload,
      };

    default:
      return state;
  }
};

export default SchoolSessionReducer;
