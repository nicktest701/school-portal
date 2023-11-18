import axios from 'axios';
const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getSubjects = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/subjects`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getSubject = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/subjects`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postSubjects = async (newSubject) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/subjects`,
      data: newSubject,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const putSubject = async (updatedSubject) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/subjects`,
      data: updatedSubject,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSubject = async (id) => {
  // console.log(id)
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/subjects/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
