import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@user'));
axios.defaults.headers.common.Authorization = `Bearer ${user}`;

//Get all Users
export const getAllUsers = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/users`,
    });

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserAuth = async (userInfo) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/users/auth`,
      data: userInfo,
    });

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyUser = async () => {
  const token = JSON.parse(localStorage.getItem('@user')) || '';

  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/users/verify`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {

    throw error?.response?.data || 'Session has expired.Please login again';
  }
};

export const getUser = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/users/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const postUser = async (user) => {
  const formData = new FormData();
  //User
  formData.append('profile', user.profile);
  formData.append('fullname', user.fullname);
  formData.append('username', user.username);
  formData.append('dateofbirth', user.dateofbirth);
  formData.append('gender', user.gender);
  formData.append('role', user.role);
  formData.append('email', user.email);
  formData.append('phonenumber', user.phonenumber);
  formData.append('address', user.address);
  formData.append('residence', user.residence);
  formData.append('nationality', user.nationality);
  formData.append('password', user.password);

  try {
    const res = await axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BASE_URL}/users`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const updateUserProfileImage = async ({ _id, profile }) => {
  const formData = new FormData();
  //User
  formData.append('profile', profile);
  formData.append('_id', _id);

  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users/profile`,
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

export const updateUserPassword = async (passwordInfo) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users/reset-password`,
      data: passwordInfo,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
export const putUser = async (updatedUser) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users`,
      data: updatedUser,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const getSchoolInfo = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BASE_URL}/users/school`,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const putSchoolInfo = async (schoolInfo) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users/school`,
      data: schoolInfo,
    });

    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateSchoolLogo = async (badge) => {
  const formData = new FormData();
  formData.append('unique', 'school-info');
  formData.append('badge', badge);

  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users/school/profile`,
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

export const deleteUser = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${import.meta.env.VITE_BASE_URL}/users/${id}`,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};

export const enableOrDisableAccount = async (info) => {
  try {
    const res = await axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_BASE_URL}/users/account`,
      data: info,
    });

    return res.data;
  } catch (error) {
    //console.log(error.response.data);
  }
};
