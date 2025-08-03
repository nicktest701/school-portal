import api from './customAxios';

//Get all Students
export const getAllCourses = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/courses`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getCourse = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/courses`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getCourseDashboardInfo = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/courses/dashboard`,
      params: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const getCourseByTeacher = async (session) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/courses/teacher`,
      params: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const postCourse = async (newCourse) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/courses`,
      data: newCourse,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const putCourse = async (updatedCourse) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/courses`,
      data: updatedCourse,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/courses/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data
  }
};
