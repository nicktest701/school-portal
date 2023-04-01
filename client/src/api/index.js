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
} from './levelAPI';
import {
  getAllCurrentLevelDetails,
  postCurrentLevelDetails,
  putCurrentLevelDetails,
  deleteCurrentLevelDetails,
  getTeacherLevel,
  assignTeacherLevel,
  unassignTeacherLevel,
} from './currentLevelDetailAPI';
import {
  getAllCurrentLevels,
  getAllPreviousLevels,
  getCurrentLevel,
  getStudentsByLevel,
  getAllStudentsBySession,
  postCurrentLevel,
  putCurrentLevel,
  deleteCurrentLevel,
} from './currentLevelAPI';
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
  verifyUser,
  postUser,
  updateUserProfileImage,
  putUser,
  deleteUser,
} from './userAPI';
import {
  generateReports,
  getAllExams,
  getStudentAcademics,
  getExams,
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
  putMessage,
  deleteMessage,
} from './messageAPI';

import {
  getAllAttendances,
  getAttendance,
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

  //current level details
  getAllCurrentLevelDetails,
  postCurrentLevelDetails,
  putCurrentLevelDetails,
  deleteCurrentLevelDetails,
  getTeacherLevel,
  assignTeacherLevel,
  unassignTeacherLevel,

  //current level
  getAllCurrentLevels,
  getCurrentLevel,
  getAllStudentsBySession,
  getStudentsByLevel,
  getAllPreviousLevels,
  postCurrentLevel,
  putCurrentLevel,
  deleteCurrentLevel,

  //users
  getAllUsers,
  getUserAuth,
  verifyUser,
  getUser,
  postUser,
  updateUserProfileImage,
  putUser,
  deleteUser,

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
  getExams,
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
  putMessage,
  deleteMessage,

  //Atendance
  getAllAttendances,
  getAttendance,
  postAttendance,
  putAttendance,
  deleteAttendance,
};
