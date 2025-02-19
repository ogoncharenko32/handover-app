import React, { useEffect, useState } from "react";
import TicketsList from "../../components/TicketList/TicketsList";
import { useDispatch } from "react-redux";
import { fetchTickets } from "../../redux/tickets/operations.js";
import clsx from "clsx";
import css from "./MainPage.module.css";
import { FaPlus } from "react-icons/fa";
import AddTicketModal from "../../components/AddTicketModal/AddTicketModal.jsx";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={clsx(css.wrapper)}>
      <TicketsList />
      <button
        className={clsx(css.plusButton)}
        onClick={() => openModal()}
        type="button"
      >
        {<FaPlus size={26} />}
      </button>
      <AddTicketModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        contentLabel="Example Modal"
      />
    </div>
  );
};

export default MainPage;
