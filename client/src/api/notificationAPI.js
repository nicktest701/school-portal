import api from "./customAxios";

//Get all Students
export const getAllNotifications = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `/notifications`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getNotification = async (id) => {
  try {
    const res = await api({
      method: "GET",
      url: `/notifications/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postNotification = async (newNotification) => {
  try {
    const res = await api({
      method: "POST",
      url: `/notifications`,
      data: newNotification,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const putNotification = async (notification) => {
  try {
    const res = await api({
      method: "PUT",
      url: `/notifications`,
      data: notification,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const res = await api({
      method: "PUT",
      url: `/notifications/${id}/read`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const markAllNotificationAsRead = async (id) => {
  try {
    const res = await api({
      method: "PUT",
      url: `/notifications/${id}/read-all`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteNotification = async (id) => {
  try {
    const res = await api({
      method: "DELETE",
      url: `/notifications/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteNotifications = async (id) => {
  try {
    const res = await api({
      method: "DELETE",
      url: `/notifications/${id}/all`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
