import { createSlice } from "@reduxjs/toolkit";
import { addTicket, fetchTickets } from "./operations.js";

const INITIAL_STATE = {
  tickets: {
    items: [],
    loading: false,
    error: null,
  },
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.tickets.loading = true;
        state.tickets.error = false;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = false;
        state.tickets.items = action.payload.data;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = action.payload;
      })
      .addCase(addTicket.pending, (state) => {
        state.tickets.loading = true;
        state.tickets.error = null;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = null;
        state.tickets.items.push(action.payload.data);
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = action.payload;
      }),
  reducers: {
    clearTickets: (state) => {
      state.tickets.items = [];
    },
  },
});

export const ticketsReducer = ticketsSlice.reducer;
export const { clearTickets } = ticketsSlice.actions;
