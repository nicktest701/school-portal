import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_NET_LOCAL;

//Get all Students
export const getAllAttendances = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/attendances`,
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
      url: `/api/attendances/${id}`,
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
      url: `/api/attendances`,
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
      url: `/api/attendances`,
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
      url: `/api/attendances/${id}`,
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
      url: `/api/attendances/history/${levelId}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
