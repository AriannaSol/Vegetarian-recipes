import React from "react";
import { Link } from "react-router-dom";

const Burger = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="burger-menu">
      <div
        className={open ? "burger-container-light" : "burger-container-dark"}
        open={open}
        onClick={() => setOpen(!open)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={open ? "burger-menu-open" : "burger-menu-close"}>
        <Link className="burger-nav-pages" to="/">
          Home
        </Link>
        <Link className="burger-nav-pages" to="/favRecipes">
          My Favorites
        </Link>
      </div>
    </div>
  );
};
export default Burger;
