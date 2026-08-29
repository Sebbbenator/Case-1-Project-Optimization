import { Link } from "react-router";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerTop}>
        <div className={styles.footerIntro}>
          <p className={styles.footerBrand}>
            <span>mellem</span>
            <span className="brand-gap" aria-hidden="true"></span>
            <span>rum</span>
          </p>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
        <nav className={styles.footerLinks} aria-label="Footer">
          <div className={styles.footerLinkGroup}>
            <h2 className={styles.footerHeading}>Udforsk</h2>
            <div className={styles.footerLinkRow}>
              <Link to="/events">Events</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/steder">Steder</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/om">Om Mellemrum</Link>
            </div>
          </div>
          <div className={styles.footerLinkGroup}>
            <h2 className={styles.footerHeading}>For arrangører</h2>
            <div className={styles.footerLinkRow}>
              <Link to="/tilmeldinger">Se tilmeldinger</Link>
              <span className="nav-divider" aria-hidden="true"></span>
              <Link to="/kontakt">Kontakt os</Link>
            </div>
          </div>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Mellemrum</p>
        <p>Aarhus, Danmark</p>
      </div>
    </footer>
  );
}
