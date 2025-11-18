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

