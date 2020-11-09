
import axios from "axios";

const URL = "http://localhost:8000";

const register = (username, email, password) => {
  return axios
    .post(`${URL}/signup`, {
      username,
      email,
      password,
    });
};

const login = async (username, password) => {
  const response = await axios
    .post(`${URL}/signin`, {
      username,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUserToken = () => {
  const user = getCurrentUser();

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};

const User = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserToken
};

export default User; 