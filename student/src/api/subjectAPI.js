import api from './customAxios';




//Get all Students
export const getSubjects = async ({ session, term }) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/subjects?session=${session}&term=${term}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSubject = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/subjects`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
