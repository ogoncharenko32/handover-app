import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import css from "./Ticket.module.css";

const Ticket = ({ data }) => {
  return (
    <div className={clsx(css.wrapper)}>
      <h3>{data.type}</h3>
      <p>{data.description}</p>
      <Link to={data.link} target="_blank">
        link
      </Link>
    </div>
  );
};

export default Ticket;
