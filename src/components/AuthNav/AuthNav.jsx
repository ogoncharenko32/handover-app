import { NavLink } from "react-router-dom";
// import css from "./AuthNav.module.css";
import clsx from "clsx";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  const buildCssClasses = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <div className={clsx(css.wrapper)}>
      <NavLink className={buildCssClasses} to="/signup">
        SignUp
      </NavLink>
      <NavLink className={buildCssClasses} to="/signin">
        SignIn
      </NavLink>
    </div>
  );
};

export default AuthNav;
