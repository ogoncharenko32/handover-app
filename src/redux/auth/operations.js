import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetCurrentUser,
  apiLogin,
  apiLogoutUser,
  apiRegisterUser,
  clearToken,
  setToken,
} from "../../api/index.js";

export const register = createAsyncThunk(
  "auth/register",
  async (userFormData, thunkApi) => {
    try {
      const data = await apiRegisterUser(userFormData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userFormData, thunkApi) => {
    try {
      const data = await apiLogin(userFormData);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const data = await apiLogoutUser();
    clearToken();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No valid token");
    }

    try {
      setToken(token);
      const data = await apiGetCurrentUser();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
