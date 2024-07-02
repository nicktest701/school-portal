
import api from './customAxios';

//Get all Students
export const getAllNotifications = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/notifications`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getNotification = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/notifications/${id}`,

    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postNotification = async (newNotification) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/notifications`,
      data: newNotification,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};



export const putNotification = async (notification) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/notifications`,
      data: notification,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/notifications/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export const deleteNotifications = async (notifications) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/notifications/remove`,
      data: notifications
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
