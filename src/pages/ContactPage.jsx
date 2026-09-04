import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  usePageTitle("Kontakt | Mellemrum");

  return (
    <>
      <header className={styles.contactHeader}>
        <p className="eyebrow">Kontakt</p>
        <h1>Skriv til os.</h1>
        <p>Uanset om du er nysgerrig, vil tilmelde dig, eller er arrangør — hører vi gerne fra dig.</p>
      </header>

      <main className={styles.contactRow}>
        <div className={styles.contactPath}>
          <h2>Har du et spørgsmål?</h2>
          <p>Om et event, en tilmelding, eller bare nysgerrig på platformen.</p>
          <a className={styles.contactCta} href="mailto:hej@mellemrum.dk">
            hej@mellemrum.dk →
          </a>
        </div>
        <span className={styles.contactDivider} aria-hidden="true"></span>
        <div className={styles.contactPath}>
          <h2>Er du arrangør?</h2>
          <p>Vil du dele et event, eller nå ud til vores publikum?</p>
          <a className={styles.contactCta} href="mailto:hej@mellemrum.dk">
            Tal med os om et event →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
