//Get all Users
// const ACCESS_EXPIRATION = new Date(Date.now() + 3600000);

export const getUser = () => {
  const user = localStorage.getItem("@user");

  if (user === undefined || user === null || user === "undefined") {
    return {
      id: "",
      _id: "",
    };
  }

  return parseJwt(user);
};

export const saveUser = (accessToken) => {
  if (accessToken === "undefined" || accessToken === undefined) {
    return;
  }
  localStorage.setItem("@user", accessToken);
};

export const deleteUser = () => {
  localStorage.removeItem("@user");
  localStorage.removeItem("@school_info");
  localStorage.removeItem("@school_session");
};

export const getToken = () => {
  const token = localStorage.getItem("@user");

  if (token === undefined || token === null || token === "undefined") {
    return "";
  }
  return token;
};

export const setToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem("@user", token);
    sessionStorage.removeItem("@user");
  } else {
    sessionStorage.setItem("@user", token);
    localStorage.removeItem("@user");
  }
};

export const getRefreshToken = () => {
  const token = localStorage.getItem("@user_refresh");

  if (token === undefined || token === null || token === "undefined") {
    return "";
  }
  return token;
};

export const saveToken = (accessToken, refreshToken) => {
  if (
    accessToken === "undefined" ||
    accessToken === undefined ||
    refreshToken === "undefined" ||
    refreshToken === undefined
  ) {
    return;
  }
  localStorage.setItem("@user", accessToken);
  localStorage.setItem("@user_refresh", refreshToken);
};

export const saveAccessToken = (accessToken) => {
  if (accessToken === "undefined" || accessToken === undefined) {
    return;
  }
  localStorage.setItem("@user", accessToken);
};

export const deleteToken = () => {
  localStorage.removeItem("@user");
  localStorage.removeItem("@user_refresh");
  sessionStorage.removeItem("@user");
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = parseJwt(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const saveLoginInfo = (studentId, password, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem("rememberStudentId", studentId);
    localStorage.setItem("rememberPassword", password);
  } else {
    localStorage.removeItem("rememberStudentId");
    localStorage.removeItem("rememberPassword");
  }
};

export const getSavedLoginInfo = () => {
  return {
    studentId: localStorage.getItem("rememberStudentId") || "",
    password: localStorage.getItem("rememberPassword") || "",
  };
};

export function parseJwt(token) {
  if (!token || token === undefined || token === "undefined") {
    return null;
  } else {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
