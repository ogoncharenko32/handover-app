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

export const apiGetTickets = async (shiftId) => {
  const { data } = await handoverInstance.get("/browse", {
    params: {
      shiftId,
    },
  });
  return data;
};

export const apiAddTicket = async (ticket) => {
  const { data } = await handoverInstance.post("/browse", ticket);
  return data;
};
export const apiDeleteTicket = async (ticketId) => {
  const { data } = await handoverInstance.delete(`/browse/${ticketId}`);
  return data;
};

export const apiGetGroups = async () => {
  const { data } = await handoverInstance.get("/auth/get-groups");
  return data;
};

export const apiGetShifts = async () => {
  const { data } = await handoverInstance.get("/browse/get-shifts");
  return data;
};

export const apiCreateShift = async (date) => {
  const { data } = await handoverInstance.post("/browse/create-shift", date);
  return data;
};

export const apiEditTicket = async (ticket) => {
  const { data } = await handoverInstance.patch(
    `/browse/${ticket._id}`,
    ticket
  );
  return data;
};
