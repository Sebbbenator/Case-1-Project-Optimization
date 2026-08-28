import { Link } from "react-router";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <header
        className="about-header"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1553376482-e96b68bd1e11?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0)"
        }}
      >
        <div className="about-header-content">
          <p className="eyebrow">Om Mellemrum</p>
          <h1>Vi skaber mellemrum i kalenderen.</h1>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
      </header>
      <main className="about-page">
        <section className="about-idea" aria-labelledby="about-idea-title">
          <p className="eyebrow">Idéen</p>
          <h2 id="about-idea-title">En enkel vej til det, der sker tæt på.</h2>
          <p className="about-idea-lead">
            Mellemrum samler koncerter, talks, workshops og fællesskaber, så du lettere kan opdage noget, du ikke
            allerede kendte.
          </p>
          <p className="about-idea-sub">
            Vi gør det lokale kulturliv mere overskueligt og skaber en kort vej fra nysgerrighed til en plads i
            kalenderen.
          </p>
        </section>

        <section className="about-audiences" aria-labelledby="about-audiences-title">
          <div className="about-section-heading">
            <p className="eyebrow dark">Målgrupper</p>
            <h2 id="about-audiences-title">Mellemrum forbinder oplevelser med mennesker.</h2>
          </div>
          <div className="about-audience-split">
            <article className="about-audience-card about-audience-card--dark">
              <span>Primær målgruppe</span>
              <h3>For dig, der vil opdage byen</h3>
              <p className="about-audience-copy">
                Find lokale oplevelser, få det vigtigste overblik, og tilmeld dig uden unødige omveje.
              </p>
              <Link className="about-audience-cta" to="/events">
                Udforsk kommende events →
              </Link>
            </article>
            <article className="about-audience-card about-audience-card--lime">
              <span>For arrangører</span>
              <h3>Gør oplevelsen synlig</h3>
              <p className="about-audience-copy">
                Del events med et nysgerrigt publikum, og få overblik over de mennesker, der tilmelder sig.
              </p>
              <a className="about-audience-cta" href="mailto:hej@mellemrum.dk">
                Tal med os om et event →
              </a>
            </article>
          </div>
        </section>

        <section className="about-flow-section" aria-labelledby="about-flow-title">
          <div className="about-section-heading">
            <p className="eyebrow dark">Sådan hænger det sammen</p>
            <h2 id="about-flow-title">Fra idé til plads i kalenderen.</h2>
          </div>
          <ol className="about-flow-list">
            <li>
              <span className="about-flow-badge">1</span>
              <strong>Arrangører deler events</strong>
              <p>Oplevelsen får en tydelig plads på platformen.</p>
            </li>
            <li>
              <span className="about-flow-badge">2</span>
              <strong>Brugere opdager</strong>
              <p>Søgning, kategorier og kuratering gør det lettere at vælge.</p>
            </li>
            <li>
              <span className="about-flow-badge">3</span>
              <strong>Brugere tilmelder sig</strong>
              <p>Fra interesse til tilmelding i ét sammenhængende flow.</p>
            </li>
          </ol>
        </section>

        <section className="about-city" aria-labelledby="about-city-title">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1532370778713-1400f3d62094?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Moderne arkitektur med lyse facader og turkise altaner"
            />
            <figcaption>Byrum, arkitektur og nye perspektiver.</figcaption>
          </figure>
          <div className="about-city-card">
            <p className="eyebrow dark">Aarhus tæt på</p>
            <h2 id="about-city-title">Find plads til noget nyt.</h2>
            <p>Mellemrum peger på steder, idéer og fællesskaber på tværs af byen — fra små scener til store tanker.</p>
            <Link className="about-cta" to="/events">
              Se kommende events →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
