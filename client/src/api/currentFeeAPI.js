 import axios from 'axios';


//Get all Students
export const getAllCurrentFees = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

//Get all Students
export const getAllRecentlyPaidFees = async (info) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/recent`,
      params: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

//Get all fees Summary
export const getAllCurrentFeesPaymentHistoryByDate = async (data) => {
  try {
    const res = await axios({
      method: 'get',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/day`,
      params: data,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

//Get all fees Summary
export const getAllCurrentFeesSummary = async (sessionInfo) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/summary`,
      data: sessionInfo,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

//Get all fees by level
export const getAllCurrentFeesByLevel = async (sessionInfo) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/level`,
      data: sessionInfo,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getCurrentFee = async (session, level) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/current-level`,
      data: {
        ...session,
        level,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getCurrentFeeForStudent = async (info) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/student`,
      data: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getStudentAllFeeHistory = async (student) => {
  try {
    const res = await axios({
      method: 'GET',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/history/all`,
      params: {
        student,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const getStudentFeeHistory = async (info) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees/history`,
      data: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postCurrentFee = async (newCurrentFee) => {
  try {
    const res = await axios({
      method: 'POST',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees`,
      data: newCurrentFee,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const putCurrentFee = async (updatedCurrentFee) => {
  try {
    const res = await axios({
      method: 'PUT',
      url:  `${import.meta.env.VITE_BASE_URL}/current-fees`,
      data: updatedCurrentFee,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const deleteCurrentFee = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url:  `${import.meta.env.VITE_BASE_URL}/fees/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
