import { Link } from "react-router";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <p className="eyebrow">Kultur i Aarhus</p>
        <h1>Find plads til noget nyt.</h1>
        <p className="hero-copy">
          Koncerter, talks og workshops samlet ét sted. Find dit næste event, og tilmeld dig på få minutter.
        </p>
        <Link className="hero-link" to="/events">
          Se kommende events →
        </Link>
      </header>
      <Footer />
    </>
  );
}
