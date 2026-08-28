import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <p className="footer-brand">
            mellemrum<span>.</span>
          </p>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <div className="footer-link-group">
            <h2 className="footer-heading">Udforsk</h2>
            <Link to="/events">Events</Link>
            <Link to="/steder">Steder</Link>
            <Link to="/om">Om Mellemrum</Link>
          </div>
          <div className="footer-link-group">
            <h2 className="footer-heading">For arrangører</h2>
            <Link to="/tilmeldinger">Se tilmeldinger</Link>
            <Link to="/kontakt">Kontakt os</Link>
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
