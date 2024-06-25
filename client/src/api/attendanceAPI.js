import axios from 'axios';

//Get all Students
export const getAllAttendances = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/attendances`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getAttendance = async (id, date) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/attendances/${id}`,
      params: {
        date,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postAttendance = async (newAttendance) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/attendances`,
      data: newAttendance,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postStudentAttendance = async (newAttendance) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/attendances/student`,
      data: newAttendance,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putAttendance = async (updatedAttendance) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/attendances`,
      data: updatedAttendance,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteAttendance = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/attendances/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getAttendanceHistory = async (levelId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/attendances/history/${levelId}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
