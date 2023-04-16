import axios from 'axios';



//Get all Students
export const getAllLevels = async (session, term) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `/levels/session`,
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
      url:  `/levels`,
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
      url:  `/levels`,
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
      url:  `/levels/generate`,
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
      url:  `/levels`,
      data: updatedLevel,
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
      url:  `/levels`,
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

//////////-------------SUBJECTS----------//////////

export const getSubjectsForLevel = async (levelId) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `/levels/subject`,
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
      url:  `/levels/subject`,
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
      url:  `/levels/recent/birthday`,
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
      url:  `/levels/dashboard-info`,
      params: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
