export const alertSuccess = (data) => {
  const successData = typeof data === 'object' ? data?.message : data;
  return {
    type: "showAlert",
    payload: {
      severity: "info",
      message: successData,
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
