import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllMessages = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/messages`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getMessage = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/messages`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postMessage = async (newMessage) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/messages/${newMessage.rate}`,
      data: newMessage,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const resendMessage = async (messageInfo) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/messages/resend`,
      data: messageInfo,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const putMessage = async (updatedMessage) => {
  try {
    const res = await axios({
      method: 'PUT',
      url:  `${import.meta.env.VITE_BASE_URL}/messages`,
      data: updatedMessage,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteMessage = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url:  `${import.meta.env.VITE_BASE_URL}/messages/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
