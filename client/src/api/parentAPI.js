import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_NET_LOCAL;

//Get all Students
export const getAllParents = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/parents`,
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
      url: `/api/parents/student`,
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
      url: `/api/parents/${id}`,
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
      url: `/api/parents`,
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
      url: `/api/parents`,
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
      url: `/api/parents/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
