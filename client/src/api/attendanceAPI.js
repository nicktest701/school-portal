
import api from './customAxios';

//Get all Students
export const getAllAttendances = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/attendances`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getAttendance = async (id, date) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/attendances/${id}`,
      params: {
        date,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postAttendance = async (newAttendance) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/attendances`,
      data: newAttendance,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postStudentAttendance = async (newAttendance) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/attendances/student`,
      data: newAttendance,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const putAttendance = async (updatedAttendance) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/attendances`,
      data: updatedAttendance,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteAttendance = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/attendances/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getAttendanceHistory = async (levelId) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/attendances/history/${levelId}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
