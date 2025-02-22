import { createSlice } from "@reduxjs/toolkit";
import {
  addTicket,
  createShift,
  deleteTicket,
  editTicket,
  fetchShifts,
  fetchTickets,
} from "./operations.js";

const INITIAL_STATE = {
  tickets: {
    items: [],
    loading: false,
    error: null,
  },
  shifts: {
    items: [],
    loading: false,
    error: null,
  },
  selectedShiftId: null,
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
      })
      .addCase(deleteTicket.pending, (state) => {
        state.tickets.loading = true;
        state.tickets.error = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = null;
        state.tickets.items = state.tickets.items.filter(
          (item) => action.payload.ticketId !== item._id
        );
        console.log("Ticket removed");
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = action.payload;
      })
      .addCase(editTicket.pending, (state) => {
        state.tickets.loading = true;
        state.tickets.error = null;
      })
      .addCase(editTicket.fulfilled, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = null;

        const updatedTicket = action.payload;
        state.tickets.items = state.tickets.items.map((ticket) =>
          ticket._id === updatedTicket.data._id ? updatedTicket.data : ticket
        );
        console.log("Ticket updated");
      })
      .addCase(editTicket.rejected, (state, action) => {
        state.tickets.loading = false;
        state.tickets.error = action.payload;
      })
      .addCase(fetchShifts.pending, (state) => {
        state.shifts.loading = true;
        state.shifts.error = null;
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts.loading = false;
        state.shifts.error = null;
        state.shifts.items = action.payload.data;
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.shifts.loading = false;
        state.shifts.error = action.payload;
      })
      .addCase(createShift.pending, (state) => {
        state.shifts.loading = true;
        state.shifts.error = null;
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.shifts.loading = false;
        state.shifts.error = null;
        state.shifts.items.push(action.payload.data);
        state.selectedShiftId = action.payload.data._id;
      })
      .addCase(createShift.rejected, (state, action) => {
        state.shifts.loading = false;
        state.shifts.error = action.payload;
      }),
  reducers: {
    clearTickets: (state) => {
      state.tickets.items = [];
    },
    setSelectedShift: (state, action) => {
      state.selectedShiftId = action.payload;
    },
  },
});

// const shiftsSlice = createSlice({
//   name: "shifts",
//   initialState: INITIAL_STATE.shifts,
//   reducers: {
//     setSelectedShift(state, action) {
//       state.selectedShiftId = action.payload;
//     },
//   },
// });

export const ticketsReducer = ticketsSlice.reducer;
export const { clearTickets } = ticketsSlice.actions;

export const { setSelectedShift } = ticketsSlice.actions;
// export const shiftsReducer = shiftsSlice.reducer;
