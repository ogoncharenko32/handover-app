import React from "react";
import { useSelector } from "react-redux";
import { selectShifts } from "../../redux/tickets/selectors";
import Shift from "../Shift/Shift";

const ShiftList = () => {
  const shifts = useSelector(selectShifts);

  return (
    <div>
      ShiftList
      <ul>
        {shifts.map((shift) => (
          <li key={shift._id}>
            <Shift shift={shift} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftList;
