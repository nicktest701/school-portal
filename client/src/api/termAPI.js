
import api from './customAxios';


//Get all Students
export const getAllTerms = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/terms`,
      params: {
        session,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get all Students
export const getAllSessions = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/terms/sessions`,
      params: {
        session,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};


export const getTerm = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/terms/${id}`,

    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const getValidTerm = async ({ academicYear, term }) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/terms/valid?academicYear=${academicYear}&term=${term}`,

    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};


export const postTerm = async (newTerm) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/terms`,
      data: newTerm,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};


export const putTerm = async (updatedSession) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/terms`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};


export const disableSessionAccount = async ({ _id, active }) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/terms/account`,
      data: {
        id: _id,
        active,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
export const deleteManyTerms = async (terms) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/terms/remove`,
      data: terms
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const deleteTerm = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/terms/${id}`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
