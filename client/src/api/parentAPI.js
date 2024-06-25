import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllParents = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/parents`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getParentByStudentId = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/parents/student`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getParent = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/parents/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postParent = async (newParent) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/parents`,
      data: newParent,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putParent = async (updatedParent) => {
  try {
    const res = await axios({
      method: 'PUT',
      url:  `${import.meta.env.VITE_BASE_URL}/parents`,
      data: updatedParent,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteParent = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url:  `${import.meta.env.VITE_BASE_URL}/parents/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
