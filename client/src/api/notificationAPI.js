import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllNotifications = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/notifications`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getNotification = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/notifications/${id}`,

    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postNotification = async (newNotification) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/notifications`,
      data: newNotification,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};



export const putNotification = async (notification) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/notifications`,
      data: notification,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/notifications/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export const deleteNotifications = async (notifications) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/notifications/remove`,
      data: notifications
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
