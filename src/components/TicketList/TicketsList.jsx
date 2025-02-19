import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTickets } from "../../redux/tickets/selectors.js";
import Ticket from "../Ticket/Ticket.jsx";
import clsx from "clsx";
import css from "./TicketsList.module.css";

const TicketsList = () => {
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
