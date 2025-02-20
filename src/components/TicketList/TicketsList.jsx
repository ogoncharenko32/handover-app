import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedShiftId,
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

  return (
    <div>
      <ul className={clsx(css.ticketsList)}>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <Ticket data={ticket} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketsList;
