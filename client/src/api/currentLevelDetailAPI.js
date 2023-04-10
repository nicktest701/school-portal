import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_NET_LOCAL;

//Get all Students
export const getAllCurrentLevelDetails = async (sessionId, termId) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/current-level-details`,
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

export const postCurrentLevelDetails = async (newLevel) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/current-level-details`,
      data: newLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putCurrentLevelDetails = async (updatedLevel) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/api/current-level-details`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

//Get Teacher assigned Level
export const getTeacherLevel = async (assignedLevelDetails) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/levels/assign-teacher`,
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
      method: "PUT",
      url: `/api/levels/assign-teacher`,
      data: updatedLevel,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const unassignTeacherLevel = async (updatedLevel) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/api/levels/unassign-teacher`,
      data: {
        _id: updatedLevel,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putCurrentSubjectsByCurrentLevelDetails = async (newSubjects) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `/api/current-level-details/subjects`,
      data: newSubjects,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteCurrentLevelDetails = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/current-level-details`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
