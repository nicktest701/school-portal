import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_NET_LOCAL;

export const getAllPreviousLevels = async (session) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/levels/previous`,
      params: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getAllCurrentLevels = async (sessionId, termId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/current-levels`,
      params: {
        sessionId,
        termId,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getCurrentLevel = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/current-levels/current`,
      params: {
        currentLevelId: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getAllStudentsBySession = async (session, type) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/levels/students/all`,
      data: {
        sessionId: session.sessionId,
        termId: session.termId,
        type,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getStudentByLevel = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/current-levels/student`,
      data: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getStudentsByLevel = async (session) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/current-levels/students`,
      data: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postCurrentLevel = async (newLevel) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/current-levels`,
      data: newLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putCurrentLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/api/current-levels`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteCurrentLevel = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/current-levels`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
