import api from "./customAxios";

//Get all Students
export const getGrades = async (session, term) => {
  try {
    const res = await api({
      method: "GET",
      url: `/grades`,
      params: {
        session,
        term,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGrade = async (id) => {
  try {
    const res = await api({
      method: "GET",
      url: `/grades/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
