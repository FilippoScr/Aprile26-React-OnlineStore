import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Benvenuto nella Home</h1>
        <NavLink
          to="/error"
          className="errorBtn"
        >
          Visualizza Pagina Errore
        </NavLink>
    </div>
  )
}