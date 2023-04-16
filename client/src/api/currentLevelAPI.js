import axios from "axios";

 

export const getAllPreviousLevels = async (session) => {
  try {
    const res = await axios({
      method: "GET",
      url:  `/levels/previous`,
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
      url:  `/current-levels`,
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
      url:  `/current-levels/current`,
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
      url:  `/levels/students/all`,
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
      url:  `/current-levels/student`,
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
      url:  `/current-levels/students`,
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
      url:  `/current-levels`,
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
      url:  `/current-levels`,
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
      url:  `/current-levels`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
