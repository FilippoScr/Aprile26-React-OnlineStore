import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? "navLink activeNL" : "navLink inactiveNL"}
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => isActive ? "navLink activeNL" : "navLink inactiveNL"}
      >
        Prodotti
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) => isActive ? "navLink activeNL" : "navLink inactiveNL"}
      >
        Preferiti
      </NavLink>

      <NavLink
        to="/aboutus"
        className={({ isActive }) => isActive ? "navLink activeNL" : "navLink inactiveNL"}
      >
        Chi Siamo
      </NavLink>
    </nav>
  );
}
