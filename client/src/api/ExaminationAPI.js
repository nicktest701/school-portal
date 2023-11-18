import axios from 'axios';

const URL = import.meta.env.VITE_BASE_URL;
const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllExams = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations`,
      params: {
        sessionId: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Get all level exams details
export const getExamsDetails = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations/details`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
//Get all level exams details
export const getSubjectScore = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations/subject`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//GENERATE REPORTS
export const generateReports = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations/reports`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//GENERATE REPORTS
export const publishReports = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations/publish`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//GENERATE REPORTS
export const publishStudentReport = async (session) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations/publish/student`,
      data: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Get all Students
export const getStudentAcademics = async (session, student, level) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations/student/academics`,
      data: {
        student,
        session: session.sessionId,
        term: session.termId,
        level,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Get Exams by exams id
export const getExams = async (examsId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${URL}/examinations/student`,
      params: {
        examsId,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
//Get Exams by exams id
export const getCurrentExams = async (session) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations/student/current`,
      data: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Add new Exams
export const postExamsRemarks = async (comments) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${URL}/examinations/comments`,
      data: comments,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
//Add new Exams
export const postExams = async (newExam) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations`,
      data: newExam,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Add new Exams
export const postBulkExams = async (newExam) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations/bulk`,
      data: newExam,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

//Update Exams scores
export const updateExams = async (updatedScores) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${URL}/examinations/update`,
      data: updatedScores,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const putExams = async (updatedExam) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${URL}/examinations`,
      data: updatedExam,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteExams = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${URL}/examinations`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
