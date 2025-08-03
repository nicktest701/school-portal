import api from "./customAxios";


//Get all Students
export const getAllNotes = async () => {
  try {
    const res = await api({
      method: "GET",
      url: `/notes`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getNote = async (id) => {
  try {
    const res = await api({
      method: "GET",
      url: `/notes/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postNote = async (newNote) => {
  console.log(newNote);
  try {
    const res = await api({
      method: "POST",
      url: `/notes`,
      data: newNote,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const putNote = async (id, note) => {
  try {
    const res = await api({
      method: "PUT",
      url: `/notes/${id}`,
      data: note,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteNote = async (id) => {
  try {
    const res = await api({
      method: "DELETE",
      url: `/notes/${id}`,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteNotes = async (notes) => {
  try {
    const res = await api({
      method: "PUT",
      url: `/notes/remove`,
      data: notes,
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
