import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="site-nav">
      <NavLink className="brand" to="/">
        <span className="brand-word">mellem</span>
        <span className="brand-gap" aria-hidden="true"></span>
        <span className="brand-word">rum</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/events">Events</NavLink>
        <span className="nav-divider" aria-hidden="true"></span>
        <NavLink to="/steder">Steder</NavLink>
        <span className="nav-divider" aria-hidden="true"></span>
        <NavLink to="/om">Om Mellemrum</NavLink>
        <span className="nav-divider" aria-hidden="true"></span>
        <NavLink to="/kontakt">Kontakt</NavLink>
      </div>
    </nav>
  );
}
