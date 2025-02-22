import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import clsx from "clsx";
import css from "./UserMenu.module.css";
import { useState } from "react";
import ComfirmModal from "../ConfirmModal/ComfirmModal";

const UserMenu = () => {
  //   const buildCssClasses = ({ isActive }) =>
  //     clsx(css.link, isActive && css.active);

  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  const openLogoutModal = () => setLogoutModalIsOpen(true);
  const closeLogoutModal = () => setLogoutModalIsOpen(false);

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
      <button className={clsx(css.button)} type="button">
        Settings
      </button>
      <button
        className={clsx(css.button)}
        onClick={openLogoutModal}
        type="button"
      >
        Logout
      </button>
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
