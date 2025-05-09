import api from './customAxios';




//Get all Students details
export const getAllStudentsDetails = async (session) => {
  // console.log(session);
  try {
    const res = await api({
      method: 'GET',
      url: `/students/details`,
      params: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get all Students
export const getAllStudents = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
//Get all Students
export const getAllStudentID = async () => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/ids`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get all Students
export const getAllStudentsByCurrentLevel = async (currentLevelId) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/current`,
      params: {
        currentLevelId,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

//Get All Students for search

export const getAllStudentsForSearch = async (session) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/levels/students`,
      data: session,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const getStudent = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/${id}`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const getStudentByIndexNumber = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/index-number?id=${id}`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};


export const getParentByStudentId = async (id) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/parent`,
      params: {
        id,
      },
    });

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postStudent = async ({ student, parent }) => {
  const formData = new FormData();
  //Student
  formData.append('profile', student.profile);
  formData.append('firstname', student.firstname);
  formData.append('surname', student.surname);
  formData.append('othername', student?.othername);
  formData.append('dateofbirth', student.dateofbirth);
  formData.append('gender', student.gender);
  formData.append('email', student?.email);
  formData.append('phonenumber', student?.phonenumber);
  formData.append('address', student.address);
  formData.append('residence', student.residence);
  formData.append('nationality', student.nationality);
  formData.append('level', student.level._id);
  formData.append('levelName', student.level?.type);
  formData.append('academicYear', student.session?.academicYear);
  formData.append('session', student.session?.sessionId);
  formData.append('term', student.session?.termId);

  //Parent
  formData.append('parentFirstName', parent.firstname);
  formData.append('parentSurName', parent.surname);
  formData.append('parentGender', parent.gender);
  formData.append('parentEmail', parent.email);
  formData.append('parentPhoneNo', parent.phonenumber);
  formData.append('parentAddress', parent.address);
  formData.append('parentNationality', parent.nationality);

  try {
    const res = await api({
      method: 'POST',
      url: `/students`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const postNewStudent = async ({ photo, details }) => {
  const formData = new FormData();

  //Student
  formData.append('profile', photo ? photo[0] : null);
  formData.append('details', JSON.stringify(details));

  try {
    const res = await api({
      method: 'POST',
      url: `/students`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const checkExistingStudentID = async (data) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/students/indexnumber`,
      data,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
export const postManyStudents = async (data) => {
  try {
    const res = await api({
      method: 'POST',
      url: `/students/many`,
      data,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const putStudent = async (updatedStudent) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/students`,
      data: updatedStudent,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const updateStudentMedicalHistory = async (updatedStudent) => {
  try {
    const res = await api({
      method: 'PUT',
      url: `/students/medical`,
      data: updatedStudent,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const deleteStudent = async (id) => {
  try {
    const res = await api({
      method: 'DELETE',
      url: `/students/${id}`,
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};

export const disableStudentAccount = async ({ id, active }) => {
  try {
    const res = await api({
      method: 'GET',
      url: `/students/disable`,
      params: {
        id,
        active,
      },
    });

    return res.data;
  } catch (error) {

    throw error.response.data;
  }
};
