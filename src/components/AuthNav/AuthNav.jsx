import { NavLink } from "react-router-dom";
// import css from "./AuthNav.module.css";
import clsx from "clsx";
import css from "./AuthNav.module.css";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const AuthNav = () => {
  const buildCssClasses = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <div className={clsx(css.wrapper)}>
      <NavLink className={buildCssClasses} to="/signup">
        Register
        <AppRegistrationIcon />
      </NavLink>
      <NavLink className={buildCssClasses} to="/signin">
        Login
        <LoginIcon />
      </NavLink>
    </div>
  );
};

export default AuthNav;
