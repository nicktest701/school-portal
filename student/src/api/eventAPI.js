import api from "./customAxios";

//Get all Students
export const getAllEvents = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `/events`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getEvent = async (id) => {
  try {
    const res = await api({
      method: "GET",
      url: `/events/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
