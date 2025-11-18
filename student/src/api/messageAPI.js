import api from "./customAxios";

//Get all Students
export const getAllMessages = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `/messages`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMessage = async (id) => {
  try {
    const res = await api({
      method: "GET",
      url: `/messages`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
