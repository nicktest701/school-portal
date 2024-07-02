import api from './customAxios';


//Get all Students
export const getAllExams = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations`,
      params: {
        sessionId: id,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get all level exams details
export const getExamsDetails = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations/details`,
      params: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
//Get all level exams details
export const getSubjectScore = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations/subject`,
      params: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//GENERATE REPORTS
export const generateReports = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations/reports`,
      params: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//GENERATE REPORTS
export const publishReports = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations/publish`,
      params: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//GENERATE REPORTS
export const publishStudentReport = async (session) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations/publish/student`,
      data: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get all Students
export const getStudentAcademics = async (session, student, level) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations/student/academics`,
      data: {
        student,
        session: session.sessionId,
        term: session.termId,
        level,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get Exams by exams id
export const getExams = async (examsId) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/examinations/student`,
      params: {
        examsId,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
//Get Exams by exams id
export const getCurrentExams = async (session) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations/student/current`,
      data: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Add new Exams
export const postExamsRemarks = async (comments) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/examinations/comments`,
      data: comments,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
//Add new Exams
export const postExams = async (newExam) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations`,
      data: newExam,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Add new Exams
export const postBulkExams = async (newExam) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations/bulk`,
      data: newExam,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Update Exams scores
export const updateExams = async (updatedScores) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/examinations/update`,
      data: updatedScores,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const putExams = async (updatedExam) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/examinations`,
      data: updatedExam,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const deleteExams = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/examinations`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
