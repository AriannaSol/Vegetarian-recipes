import React from "react";
import { Link } from "react-router-dom";
import Burger from "./BurgerMenu";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div>
          <Link className="nav-home" to="/">
            Vegetarian Recipes
          </Link>
        </div>
        <Burger />
        <div className="nav-links">
          <Link className="nav-pages" to="/">
            Home
          </Link>
          <Link className="nav-pages" to="/favRecipes">
            My Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
