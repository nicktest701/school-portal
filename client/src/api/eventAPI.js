import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllEvents = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/events`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getEvent = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/events/${id}`,

    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postEvent = async (newEvent) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/events`,
      data: newEvent,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};



export const putEvent = async (event) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/events`,
      data: event,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/events/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
export const deleteEvents = async (events) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/events/remove`,
      data: events
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
