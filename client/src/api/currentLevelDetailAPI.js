import axios from "axios";

 

//Get all Students
export const getAllCurrentLevelDetails = async (sessionId, termId) => {
  try {
    const res = await axios({
      method: "GET",
      url:  `/current-level-details`,
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
      url:  `/current-level-details`,
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
      url:  `/current-level-details`,
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
      url:  `/levels/assign-teacher`,
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
      url:  `/levels/assign-teacher`,
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
      url:  `/levels/unassign-teacher`,
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
      url:  `/current-level-details/subjects`,
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
      url:  `/current-level-details`,
      params: {
        _id: id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
