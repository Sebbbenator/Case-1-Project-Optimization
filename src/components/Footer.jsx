import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <p className="footer-brand">
            <span>mellem</span>
            <span className="brand-gap" aria-hidden="true"></span>
            <span>rum</span>
          </p>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <div className="footer-link-group">
            <h2 className="footer-heading">Udforsk</h2>
            <div className="footer-link-row">
              <Link to="/events">Events</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/steder">Steder</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/om">Om Mellemrum</Link>
            </div>
          </div>
          <div className="footer-link-group">
            <h2 className="footer-heading">For arrangører</h2>
            <div className="footer-link-row">
              <Link to="/tilmeldinger">Se tilmeldinger</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/kontakt">Kontakt os</Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-meta">© {new Date().getFullYear()} Mellemrum</p>
        <p>Aarhus, Danmark</p>
      </div>
    </footer>
  );
}
