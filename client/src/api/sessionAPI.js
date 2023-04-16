import axios from 'axios';

 

//Get all Students
export const getAllSessions = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/sessions`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getSession = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `/api/sessions`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postSession = async (newSession) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/sessions`,
      data: newSession,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putSession = async (updatedSession) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `/api/sessions`,
      data: updatedSession,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteSession = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/sessions/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const uploadProfileImage = async ({ _id, profile, type }) => {
  const formData = new FormData();
  //Teacher
  formData.append('profile', profile);
  formData.append('_id', _id);
  formData.append('school', '456-456');

  try {
    const res = await axios({
      method: 'PUT',
      url: `/api/${type}/profile`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw new Error(error.response.data || 'Error Updating profile');
  }
};

