import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllTerms = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/terms`,
      params: {
        session,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const getTerm = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/terms`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const postTerm = async (newTerm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/terms`,
      data: newTerm,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const putTerm = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/terms`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
export const disableSessionAccount = async ({ _id, active }) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/terms/account`,
      data: {
        id: _id,
        active,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteTerm = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/terms/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
