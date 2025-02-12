import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import clsx from "clsx";
// import css from "./UserMenu.module.css";

const UserMenu = () => {
  //   const buildCssClasses = ({ isActive }) =>
  //     clsx(css.link, isActive && css.active);

  const dispatch = useDispatch();

  const userData = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onLogout = () => {
    dispatch(logout());
    const action = {
      type: "contacts/clearContacts",
    };
    dispatch(action);
  };

  return (
    <div>
      {isLoggedIn && <div>Hello, {userData.name}</div>}
      <NavLink
        //   className={buildCssClasses}
        to="/home"
      >
        Home
      </NavLink>
      <button onClick={onLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
