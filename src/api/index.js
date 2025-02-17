import axios from "axios";

const handoverInstance = axios.create({
  // baseURL: 'https://66c14861f83fffcb58790652.mockapi.io/',
  //   baseURL: "https://connections-api.goit.global/",
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export const setToken = (token) => {
  handoverInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  handoverInstance.defaults.headers.common.Authorization = "";
};

export const apiRegisterUser = async (userFormData) => {
  const { data } = await handoverInstance.post("/auth/register", userFormData);
  return data;
};

export const apiLogin = async (userFormData) => {
  const { data } = await handoverInstance.post("/auth/login", userFormData);
  return data;
};

export const apiGetCurrentUser = async () => {
  const { data } = await handoverInstance.get("/auth/current");
  return data;
};

export const apiLogoutUser = async () => {
  const { data } = await handoverInstance.post("/auth/logout");
  return data;
};
