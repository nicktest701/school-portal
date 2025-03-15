import {
  getAllSessions,
  getSession,
  postSession,
  putSession,
  deleteSession,
  uploadProfileImage,
} from './sessionAPI';
import { getAllTerms, getTerm, postTerm, putTerm, deleteTerm } from './termAPI';
import {
  getAllLevels,
  getSubjectsForLevel,
  addSubjectsToLevel,
  getLevel,
  postLevel,
  putLevel,
  deleteLevel,
  generateNewCurrentLevelDetailsFromLevels,
  getTodaysBirth,
  getDashboardInfo,
  getTeacherLevel,
  assignTeacherLevel,
  unassignTeacherLevel,
} from './levelAPI';

import {
  getAllStudents,
  getAllStudentsForSearch,
  getAllStudentsByCurrentLevel,
  getAllStudentsDetails,
  getStudent,
  getParentByStudentId,
  postStudent,
  postManyStudents,
  putStudent,
  deleteStudent,
  disableStudentAccount,
} from './studentAPI';
import {
  getAllTeachers,
  getTeacher,
  postTeacher,
  putTeacher,
  deleteTeacher,
} from './teacherAPI';
import {
  getAllUsers,
  getUser,
  getUserAuth,
  enableOrDisableAccount,
  updateUserPassword,
  verifyUser,
  postUser,
  updateUserProfileImage,
  putUser,
  deleteUser,
  putSchoolInfo,
  getSchoolInfo,
} from './userAPI';
import {
  generateReports,
  getAllExams,
  getStudentAcademics,
  getExam,
  getCurrentExams,
  getExamsDetails,
  postExams,
  updateExams,
  postExamsRemarks,
  putExams,
  deleteExams,
} from './ExaminationAPI';

import {
  getAllFees,
  getFee,
  getFeeForCurrentLevel,
  getAllFeesByCurrentLevel,
  postFee,
  putFee,
  deleteFee,
} from './feeAPI';
import {
  getAllCurrentFees,
  getAllCurrentFeesSummary,
  getAllCurrentFeesByLevel,
  getAllCurrentFeesPaymentHistoryByDate,
  getAllRecentlyPaidFees,
  getCurrentFee,
  getCurrentFeeForStudent,
  getStudentAllFeeHistory,
  getStudentFeeHistory,
  postCurrentFee,
  putCurrentFee,
  deleteCurrentFee,
} from './currentFeeAPI';

import {
  getAllMessages,
  getMessage,
  postMessage,
  resendMessage,
  putMessage,
  deleteMessage,
} from './messageAPI';

import {
  getAllAttendances,
  getAttendance,
  getAttendanceHistory,
  postAttendance,
  putAttendance,
  deleteAttendance,
} from './attendanceAPI';

import {
  getAllParents,
  getParent,
  postParent,
  putParent,
  deleteParent,
} from './parentAPI';

export default {
  //session
  getAllSessions,
  getSession,
  postSession,
  putSession,
  deleteSession,
  uploadProfileImage,

  //terms
  getAllTerms,
  getTerm,
  postTerm,
  putTerm,
  deleteTerm,

  //levels
  getAllLevels,
  getSubjectsForLevel,
  addSubjectsToLevel,
  getLevel,
  postLevel,
  putLevel,
  deleteLevel,
  generateNewCurrentLevelDetailsFromLevels,
  getTodaysBirth,
  getDashboardInfo,
  getTeacherLevel,
  assignTeacherLevel,
  unassignTeacherLevel,



  //users
  getAllUsers,
  getUserAuth,
  enableOrDisableAccount,
  updateUserPassword,
  verifyUser,
  getUser,
  postUser,
  updateUserProfileImage,
  putUser,
  deleteUser,
  putSchoolInfo,
  getSchoolInfo,

  //students
  getAllStudents,
  getAllStudentsByCurrentLevel,
  getAllStudentsForSearch,
  getAllStudentsDetails,
  getStudent,
  getParentByStudentId,
  postStudent,
  postManyStudents,
  putStudent,
  deleteStudent,
  disableStudentAccount,

  //Parents
  getAllParents,
  getParent,
  postParent,
  putParent,
  deleteParent,

  //Teachers
  getAllTeachers,
  getTeacher,
  postTeacher,
  putTeacher,
  deleteTeacher,

  //exams
  generateReports,
  getAllExams,
  getStudentAcademics,
  getExam,
  getCurrentExams,
  getExamsDetails,
  postExams,
  updateExams,
  postExamsRemarks,
  putExams,
  deleteExams,

  //fees
  getAllFees,
  getFee,
  getFeeForCurrentLevel,
  getAllFeesByCurrentLevel,
  postFee,
  putFee,
  deleteFee,

  //current fees
  getAllCurrentFees,
  getAllCurrentFeesSummary,
  getAllCurrentFeesByLevel,
  getAllCurrentFeesPaymentHistoryByDate,
  getAllRecentlyPaidFees,
  getCurrentFee,
  getCurrentFeeForStudent,
  getStudentAllFeeHistory,
  getStudentFeeHistory,
  postCurrentFee,
  putCurrentFee,
  deleteCurrentFee,

  //messsge
  getAllMessages,
  getMessage,
  postMessage,
  resendMessage,
  putMessage,
  deleteMessage,

  //Atendance
  getAllAttendances,
  getAttendance,
  getAttendanceHistory,
  postAttendance,
  putAttendance,
  deleteAttendance,
};
