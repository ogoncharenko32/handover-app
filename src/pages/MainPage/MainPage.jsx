import React, { useEffect, useState } from "react";
import TicketsList from "../../components/TicketList/TicketsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts, fetchTickets } from "../../redux/tickets/operations.js";
import clsx from "clsx";
import css from "./MainPage.module.css";
import { FaPlus } from "react-icons/fa";
import AddTicketModal from "../../components/AddTicketModal/AddTicketModal.jsx";
import ShiftList from "../../components/ShiftList/ShiftList.jsx";
import {
  selectSelectedShiftId,
  selectShifts,
} from "../../redux/tickets/selectors.js";
import Calendar from "../../components/Calendar/Calendar.jsx";

const MainPage = () => {
  const dispatch = useDispatch();

  const selectedShiftId = useSelector(selectSelectedShiftId);

  useEffect(() => {
    // dispatch(fetchTickets());
    dispatch(fetchShifts());
  }, [dispatch]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={clsx(css.wrapper)}>
      <TicketsList />

      {selectedShiftId && (
        <button
          className={clsx(css.plusButton)}
          onClick={() => openModal()}
          type="button"
        >
          {<FaPlus size={26} />}
        </button>
      )}
      <AddTicketModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        mode="addTicket"
      />
    </div>
  );
};

export default MainPage;
