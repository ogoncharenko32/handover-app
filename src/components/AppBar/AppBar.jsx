import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import clsx from "clsx";
import css from "./AppBar.module.css";
import { selectShifts } from "../../redux/tickets/selectors";
import Calendar from "../Calendar/Calendar";
import { FaCalendarAlt } from "react-icons/fa";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [calendarIsOpen, setCalendarIsOpen] = useState(false);

  const openCalendarModal = () => setCalendarIsOpen(true);
  const closeCalendarModal = () => setCalendarIsOpen(false);

  const shiftList = useSelector(selectShifts);

  return (
    <div className={clsx(css.wrapper)}>
      {/* <Navigation /> */}
      {isLoggedIn && (
        <button
          className={clsx(css.calendarButton)}
          onClick={() => openCalendarModal()}
          type="button"
        >
          {<FaCalendarAlt size={26} />}
        </button>
      )}
      <Calendar
        isOpen={calendarIsOpen}
        onClose={closeCalendarModal}
        shiftList={shiftList}
      />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;
