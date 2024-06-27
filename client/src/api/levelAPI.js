import axios from 'axios';
const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllLevels = async (session, term) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/levels/session`,
      params: {
        session,
        term,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const getLevel = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/levels`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const postLevel = async (newLevel) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/levels`,
      data: newLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const generateNewCurrentLevelDetailsFromLevels = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/levels/generate`,
      data,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const putLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/levels`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const assignGradeToLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/levels/grade`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteManyLevels = async (levels) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/levels/many`,
      data: levels
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
export const deleteLevel = async ({ id, sessionId, termId }) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/levels`,
      params: {
        id,
        sessionId,
        termId,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};


export const getAllPreviousLevels = async (session) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/levels/previous`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getAllStudentsBySession = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/levels/students/all`,
      data: {
        sessionId: session.sessionId,
        termId: session.termId,

      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};




//////////-------------SUBJECTS----------//////////

export const getSubjectsForLevel = async (levelId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/levels/subject`,
      params: {
        levelId,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const addSubjectsToLevel = async (data) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/levels/subject`,
      data,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const getTodaysBirth = async (session, term) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/levels/recent/birthday`,
      params: { session, term },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const getDashboardInfo = async (info) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/levels/dashboard-info`,
      params: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

///Teacher

//Get Teacher assigned Level
export const getTeacherLevel = async (assignedLevelDetails) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/levels/assign-teacher`,
      data: assignedLevelDetails,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const assignTeacherLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/levels/assign-teacher`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const unassignTeacherLevel = async (id) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/levels/unassign-teacher`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
