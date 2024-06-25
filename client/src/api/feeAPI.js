import axios from "axios";

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Students
export const getAllFees = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url:  `${import.meta.env.VITE_BASE_URL}/fees/all`,
      data: session,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};




export const getFee = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url:  `${import.meta.env.VITE_BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const getAllFeesByCurrentLevel = async (session) => {
  try {
    const res = await axios({
      method: "POST",
      url:  `${import.meta.env.VITE_BASE_URL}/fees/current-level/all`,
      data: session,
    });
    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
export const getFeeForCurrentLevel = async (session, level) => {
  try {
    const res = await axios({
      method: "POST",
      url:  `${import.meta.env.VITE_BASE_URL}/fees/current-level`,
      data: {
        ...session,
        level,
      },
    });
    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const postFee = async (newFee) => {
  try {
    const res = await axios({
      method: "POST",
      url:  `${import.meta.env.VITE_BASE_URL}/fees`,
      data: newFee,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const putFee = async (updatedFee) => {
  try {
    const res = await axios({
      method: "PUT",
      url:  `${import.meta.env.VITE_BASE_URL}/fees`,
      data: updatedFee,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};

export const deleteFee = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url:  `${import.meta.env.VITE_BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
    throw error.response.data;
  }
};
