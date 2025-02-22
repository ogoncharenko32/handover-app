import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedShiftId,
  selectShifts,
  selectTickets,
} from "../../redux/tickets/selectors.js";
import Ticket from "../Ticket/Ticket.jsx";
import clsx from "clsx";
import css from "./TicketsList.module.css";
import { fetchTickets } from "../../redux/tickets/operations.js";

const TicketsList = () => {
  const dispatch = useDispatch();
  const selectedShiftId = useSelector(selectSelectedShiftId);

  useEffect(() => {
    if (selectedShiftId) {
      dispatch(fetchTickets(selectedShiftId));
    }
  }, [dispatch, selectedShiftId]);

  const tickets = useSelector(selectTickets);
  const shifts = useSelector(selectShifts);

  const date = new Date(
    shifts?.find((shift) => shift._id === selectedShiftId)?.date
  ).toLocaleDateString();

  return (
    <div className={clsx(css.wrapper)}>
      <p className={clsx(css.date)}>{date}</p>
      <ul className={clsx(css.ticketsList)}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li key={ticket._id}>
              <Ticket data={ticket} />
            </li>
          ))
        ) : (
          <p className={clsx(css.emptyArray)}>No tickets for this day</p>
        )}
      </ul>
    </div>
  );
};

export default TicketsList;
