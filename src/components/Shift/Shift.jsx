import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../redux/tickets/operations.js";
import { setSelectedShift } from "../../redux/tickets/slice.js";

const Shift = ({ shift }) => {
  const dispatch = useDispatch();

  //   const selectedShiftId = useSelector((state) => state.shifts.selectedShiftId);

  //   const handleSelectShift = (shiftId) => {
  //     dispatch(setSelectedShift(shiftId));
  //   };

  const handleClick = async (id) => {
    dispatch(setSelectedShift(id));
    dispatch(fetchTickets(id));
  };

  return (
    <div>
      Shift
      <button onClick={() => handleClick(shift._id)} type="button">
        {shift._id}
      </button>
    </div>
  );
};

export default Shift;
