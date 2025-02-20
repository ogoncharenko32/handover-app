export const selectTickets = (state) => state.tickets.tickets.items;
export const selectLoading = (state) => state.tickets.tickets.loading;
export const selectError = (state) => state.tickets.tickets.error;
export const selectShifts = (state) => state.tickets.shifts.items;
export const selectSelectedShiftId = (state) => state.tickets.selectedShiftId;
