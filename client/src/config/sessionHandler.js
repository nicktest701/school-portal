//Get all Users
// const ACCESS_EXPIRATION = new Date(Date.now() + 3600000);

export const getUser = () => {
  const user = localStorage.getItem("@user");

  if (user === undefined || user === null || user === 'undefined') {
    return {
      id: "",
      profile: "",
      firstname: "", lastname: "",
      username: "",
      name: "",
      email: "",
      phonenumber: "",
      role: "",
      active: true,
    };
  }

  return parseJwt(user);

};

export const saveUser = (accessToken) => {

  if (accessToken === 'undefined' || accessToken === undefined) {
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
  const token =
    localStorage.getItem("@user")

  if (token === undefined || token === null || token === 'undefined') {
    return "";
  }
  return token;
};

export const getRefreshToken = () => {
  const token =
    localStorage.getItem("@user_refresh")

  if (token === undefined || token === null || token === 'undefined') {
    return "";
  }
  return token;
};


export const saveToken = (accessToken, refreshToken) => {

  if (accessToken === 'undefined' || accessToken === undefined || refreshToken === 'undefined' || refreshToken === undefined) {
    return;
  }
  localStorage.setItem("@user", accessToken);
  localStorage.setItem("@user_refresh", refreshToken);


};

export const saveAccessToken = (accessToken) => {

  if (accessToken === 'undefined' || accessToken === undefined) {
    return;
  }
  localStorage.setItem("@user", accessToken);



};

export const deleteToken = () => {
  localStorage.removeItem("@user");
  localStorage.removeItem("@user_refresh");

};


export function parseJwt(token) {
  if (!token || token === undefined || token === 'undefined') {
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