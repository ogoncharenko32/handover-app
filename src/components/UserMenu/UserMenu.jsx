import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import clsx from "clsx";
import css from "./UserMenu.module.css";
import { useState } from "react";
import ComfirmModal from "../ConfirmModal/ComfirmModal";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { selectTickets } from "../../redux/tickets/selectors";
import ClipboardModal from "../ClipboardModal/ClipboardModal";

const UserMenu = () => {
  //   const buildCssClasses = ({ isActive }) =>
  //     clsx(css.link, isActive && css.active);

  const tickets = useSelector(selectTickets);

  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  const openLogoutModal = () => setLogoutModalIsOpen(true);
  const closeLogoutModal = () => setLogoutModalIsOpen(false);

  const [clipboardModalIsOpen, setClipboardModalIsOpen] = useState(false);

  const openClipboardtModal = () => setClipboardModalIsOpen(true);
  const closeClipboardModal = () => setClipboardModalIsOpen(false);

  const dispatch = useDispatch();

  const userData = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onLogout = () => {
    dispatch(logout());
    const action = {
      type: "",
    };
    dispatch(action);
  };

  return (
    <div className={clsx(css.wrapper)}>
      {isLoggedIn && (
        <div className={clsx(css.greating)}>Hello, {userData?.username}</div>
      )}
      {/* <NavLink
        //   className={buildCssClasses}
        to="/home"
      >
        Home
      </NavLink> */}
      {/* <button className={clsx(css.button)} type="button">
        <SettingsIcon sx={{ fontSize: 26 }} className={clsx(css.icon)} />
      </button> */}
      {tickets.length > 0 && (
        <button
          className={clsx(css.button)}
          onClick={openClipboardtModal}
          type="button"
        >
          Export tickets for Jira
          <ContentCopyIcon sx={{ fontSize: 24 }} className={clsx(css.icon)} />
        </button>
      )}
      <button
        className={clsx(css.button)}
        onClick={openLogoutModal}
        type="button"
      >
        Logout
        <LogoutIcon sx={{ fontSize: 24 }} className={clsx(css.icon)} />
      </button>
      <ClipboardModal
        isOpen={clipboardModalIsOpen}
        onClose={closeClipboardModal}
      />
      <ComfirmModal
        isOpen={logoutModalIsOpen}
        onClose={closeLogoutModal}
        mode="Logout"
        onConfirm={() => onLogout()}
      />
    </div>
  );
};

export default UserMenu;
