import axios from 'axios';

//Get all Students
export const getAllCourses = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/courses`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getCourse = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/courses`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getCourseDashboardInfo = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/courses/dashboard`,
      params: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getCourseByTeacher = async (session) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/courses/teacher`,
      params: {
        ...session,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postCourse = async (newCourse) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/courses`,
      data: newCourse,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putCourse = async (updatedCourse) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/courses`,
      data: updatedCourse,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/courses/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
