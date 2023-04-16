import axios from 'axios';

 

//Get all Students
export const getAllParents = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `/parents`,
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
      url:  `/parents/student`,
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
      url:  `/parents/${id}`,
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
      url:  `/parents`,
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
      url:  `/parents`,
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
      url:  `/parents/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
