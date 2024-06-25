import axios from 'axios';
const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getGrades = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/grades`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGrade = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/grades/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postGrades = async (newGrade) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/grades`,
      data: newGrade,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const putGrade = async (updatedGrade) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/grades`,
      data: updatedGrade,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteGrade = async (id) => {
  // console.log(id)
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/grades/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
