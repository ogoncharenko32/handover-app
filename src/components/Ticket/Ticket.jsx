import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import css from "./Ticket.module.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import ComfirmModal from "../ConfirmModal/ComfirmModal";
import { useDispatch } from "react-redux";
import { deleteTicket, editTicket } from "../../redux/tickets/operations";
import AddTicketModal from "../AddTicketModal/AddTicketModal";
import { Switch } from "@mui/material";
import { PiExclamationMarkFill } from "react-icons/pi";
import DetailsModal from "../DetailsModal/DetailsModal";

const Ticket = ({ data }) => {
  const dispatch = useDispatch();

  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [ticketId] = useState(data._id);

  const openDeleteModal = () => setdeleteModalIsOpen(true);
  const closeDeleteModal = () => setdeleteModalIsOpen(false);
  const openEditModal = () => setEditModalIsOpen(true);
  const closeEditModal = () => setEditModalIsOpen(false);

  const handleDelete = (ticketId) => {
    dispatch(deleteTicket(ticketId));
  };
  //   const handleEditTicket = (ticket) => {
  //     console.log(ticket);
  //     dispatch(editTicket(ticket));
  //   };

  const ticketName = (link) => {
    if (link.includes("jira")) {
      return link.slice(link.lastIndexOf("/") + 1);
    } else if (link.includes("lightning.force")) {
      return `SFDC link`;
    } else {
      return link;
    }
  };

  return (
    <div className={clsx(css.wrapper)}>
      <Link className={clsx(css.link)} to={data.link} target="_blank">
        <FaExternalLinkAlt />
      </Link>
      <p>{ticketName(data.link)}</p>
      <p className={clsx(css.description)}>{data.description}</p>
      <p className={clsx(css.status)}>{data.status}</p>
      <div className={clsx(css.detailsWrapper)}>
        {data.isImportant === true && (
          <PiExclamationMarkFill className={clsx(css.checkbox)} />
        )}
        <p className={clsx(css.hoverText)}>Important</p>
        {/* <DetailsModal /> */}
      </div>
      <div className={clsx(css.btnsWrapper)}>
        <button onClick={() => openEditModal()} className={clsx(css.button)}>
          <svg
            className={clsx(css.redactSvg)}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2413 2.99135L12.366 1.86601C12.6005 1.63156 12.9184 1.49985 13.25 1.49985C13.5816 1.49985 13.8995 1.63156 14.134 1.86601C14.3685 2.10046 14.5002 2.41845 14.5002 2.75001C14.5002 3.08158 14.3685 3.39956 14.134 3.63401L7.05467 10.7133C6.70222 11.0656 6.26758 11.3245 5.79 11.4667L4 12L4.53333 10.21C4.67552 9.73244 4.93442 9.2978 5.28667 8.94535L11.2413 2.99135ZM11.2413 2.99135L13 4.75001M12 9.33335V12.5C12 12.8978 11.842 13.2794 11.5607 13.5607C11.2794 13.842 10.8978 14 10.5 14H3.5C3.10218 14 2.72064 13.842 2.43934 13.5607C2.15804 13.2794 2 12.8978 2 12.5V5.50001C2 5.10219 2.15804 4.72066 2.43934 4.43935C2.72064 4.15805 3.10218 4.00001 3.5 4.00001H6.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={() => openDeleteModal()} className={clsx(css.button)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.82667 6.00001L9.596 12M6.404 12L6.17333 6.00001M12.8187 3.86001C13.0467 3.89468 13.2733 3.93134 13.5 3.97068M12.8187 3.86001L12.1067 13.1153C12.0776 13.4922 11.9074 13.8441 11.63 14.1008C11.3527 14.3576 10.9886 14.5001 10.6107 14.5H5.38933C5.0114 14.5001 4.64735 14.3576 4.36999 14.1008C4.09262 13.8441 3.92239 13.4922 3.89333 13.1153L3.18133 3.86001M12.8187 3.86001C12.0492 3.74369 11.2758 3.65541 10.5 3.59535M3.18133 3.86001C2.95333 3.89401 2.72667 3.93068 2.5 3.97001M3.18133 3.86001C3.95076 3.74369 4.72416 3.65541 5.5 3.59535M10.5 3.59535V2.98468C10.5 2.19801 9.89333 1.54201 9.10667 1.51735C8.36908 1.49377 7.63092 1.49377 6.89333 1.51735C6.10667 1.54201 5.5 2.19868 5.5 2.98468V3.59535M10.5 3.59535C8.83581 3.46673 7.16419 3.46673 5.5 3.59535"
              stroke="var(--second-del-error-color)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <ComfirmModal
          isOpen={deleteModalIsOpen}
          onClose={closeDeleteModal}
          mode="Delete"
          onConfirm={() => handleDelete(ticketId)}
        />
        <AddTicketModal
          isOpen={editModalIsOpen}
          onClose={closeEditModal}
          mode="Edit"
          data={data}
          ticketId={ticketId}
        />
      </div>
    </div>
  );
};

export default Ticket;
