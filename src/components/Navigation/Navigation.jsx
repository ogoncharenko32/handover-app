import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import css from "./Navigation.module.css";

const Navigation = () => {
  const buildCssClasses = ({ isActive }) =>
    clsx(css.link, isActive && css.active);
  return (
    <div className={clsx(css.wrapper)}>
      <NavLink className={buildCssClasses} to="/">
        <IoHomeOutline />
      </NavLink>
      {/* <NavLink className={buildCssClasses} to="/browse">
        Workload
      </NavLink> */}
    </div>
  );
};

export default Navigation;
