import axios from 'axios';

 

//Get all Students
export const getAllTerms = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `/terms`,
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
      url:  `/terms`,
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
      url:  `/terms`,
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
      url:  `/terms`,
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
      url:  `/terms/account`,
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
      url:  `/terms/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
