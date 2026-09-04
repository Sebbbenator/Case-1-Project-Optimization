import { Link } from "react-router";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  usePageTitle("Side ikke fundet | Mellemrum");

  return (
    <>
      <header>
        <h1 className={styles.notFoundTitle}>404</h1>
      </header>
      <main className={styles.notFound}>
        <p>Siden, du leder efter, findes ikke.</p>
        <Link to="/" className={styles.notFoundLink}>
          Gå til forsiden
        </Link>
      </main>
      <Footer />
    </>
  );
}
