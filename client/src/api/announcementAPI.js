import api from './customAxios';


//Get all Students
export const getAllAnnouncements = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/announcements`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getAnnouncement = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/announcements/${id}`,

    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postAnnouncement = async (newAnnouncement) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/announcements`,
      data: newAnnouncement,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};



export const putAnnouncement = async (announcement) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/announcements`,
      data: announcement,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/announcements/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export const deleteAnnouncements = async (announcements) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/announcements/remove`,
      data: announcements
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
