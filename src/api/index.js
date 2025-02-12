import axios from "axios";

const contactsInstance = axios.create({
  // baseURL: 'https://66c14861f83fffcb58790652.mockapi.io/',
  //   baseURL: "https://connections-api.goit.global/",
  baseURL: "http://localhost:3000/",
});

export const setToken = (token) => {
  contactsInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  contactsInstance.defaults.headers.common.Authorization = "";
};

export const apiRegisterUser = async (userFormData) => {
  const { data } = await contactsInstance.post("/users/signup", userFormData);
  return data;
};

export const apiLogin = async (userFormData) => {
  const { data } = await contactsInstance.post("/users/login", userFormData);
  return data;
};

export const apiGetCurrentUser = async () => {
  const { data } = await contactsInstance.get("/users/current");
  return data;
};

export const apiLogoutUser = async () => {
  const { data } = await contactsInstance.post("/users/logout");
  return data;
};
