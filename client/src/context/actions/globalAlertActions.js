export const alertSuccess = (data) => {
  return {
    type: "showAlert",
    payload: {
      severity: "info",
      message: data,
    },
  };
};

export const alertError = (data) => {
  const errorData = typeof data === 'object' ? data?.message : data;
  return {
    type: "showAlert",
    payload: {
      severity: "error",
      message: errorData,
    },
  };
};
