import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Benvenuto nella Home</h1>
        <NavLink
          to="/error"
          className="errorButton" //{({ isActive }) => isActive ? "navLink activeNL" : "navLink inactiveNL"}
        >
          Visualizza Pagina Errore
        </NavLink>
    </div>
  )
}