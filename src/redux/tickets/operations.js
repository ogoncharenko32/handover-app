import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiAddTicket,
  apiCreateShift,
  apiDeleteTicket,
  apiEditTicket,
  apiGetShifts,
  apiGetTickets,
  setToken,
} from "../../api/index.js";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchAll",
  async (shiftId, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No valid token");
    }
    try {
      setToken(token);
      const data = await apiGetTickets(shiftId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchShifts = createAsyncThunk(
  "tickets/fetchShifts",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkApi.rejectWithValue("No valid token");
    }
    try {
      setToken(token);
      const data = await apiGetShifts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (ticket, thunkApi) => {
    try {
      const data = await apiAddTicket(ticket);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (ticketId, thunkApi) => {
    try {
      const data = await apiDeleteTicket(ticketId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const createShift = createAsyncThunk(
  "tickets/createShift",
  async (payload, thunkApi) => {
    try {
      const data = await apiCreateShift(payload);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editTicket = createAsyncThunk(
  "tickets/editTicket",
  async (ticket, thunkApi) => {
    try {
      const data = await apiEditTicket(ticket);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
