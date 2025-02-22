import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../redux/tickets/operations.js";
import { setSelectedShift } from "../../redux/tickets/slice.js";
import clsx from "clsx";
import css from "./Shift.module.css";

const Shift = ({ shift, onClose }) => {
  const dispatch = useDispatch();

  //   const selectedShiftId = useSelector((state) => state.shifts.selectedShiftId);

  //   const handleSelectShift = (shiftId) => {
  //     dispatch(setSelectedShift(shiftId));
  //   };

  const handleClick = async (id) => {
    dispatch(setSelectedShift(id));
    dispatch(fetchTickets(id));
    onClose();
  };

  return (
    <div className={clsx(css.wrapper)}>
      <button
        className={clsx(css.button)}
        onClick={() => handleClick(shift._id)}
        type="button"
      >
        <p>{shift.date.split("T")[0]}</p>
        <p>{shift._id}</p>
      </button>
    </div>
  );
};

export default Shift;
