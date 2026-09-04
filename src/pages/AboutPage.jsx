import { Link } from "react-router";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";
import styles from "./AboutPage.module.css";

export default function AboutPage() {
  usePageTitle("Om Mellemrum");

  return (
    <>
      <header
        className={styles.aboutHeader}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1553376482-e96b68bd1e11?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0)"
        }}
      >
        <div className={styles.aboutHeaderContent}>
          <p className="eyebrow">Om Mellemrum</p>
          <h1>Vi skaber mellemrum i kalenderen.</h1>
          <p>Udvalgte kulturoplevelser og nye perspektiver på Aarhus.</p>
        </div>
      </header>
      <main className={styles.aboutPage}>
        <section className={styles.aboutIdea} aria-labelledby="about-idea-title">
          <p className="eyebrow">Idéen</p>
          <h2 id="about-idea-title">En enkel vej til det, der sker tæt på.</h2>
          <p className={styles.aboutIdeaLead}>
            Mellemrum samler koncerter, talks, workshops og fællesskaber, så du lettere kan opdage noget, du ikke
            allerede kendte.
          </p>
          <p className={styles.aboutIdeaSub}>
            Vi gør det lokale kulturliv mere overskueligt og skaber en kort vej fra nysgerrighed til en plads i
            kalenderen.
          </p>
        </section>

        <section className={styles.aboutAudiences} aria-labelledby="about-audiences-title">
          <div className={styles.aboutSectionHeading}>
            <p className="eyebrow dark">Målgrupper</p>
            <h2 id="about-audiences-title">Mellemrum forbinder oplevelser med mennesker.</h2>
          </div>
          <div className={styles.aboutAudienceSplit}>
            <article className={`${styles.aboutAudienceCard} ${styles.aboutAudienceCardDark}`}>
              <span>Primær målgruppe</span>
              <h3>For dig, der vil opdage byen</h3>
              <p className={styles.aboutAudienceCopy}>
                Find lokale oplevelser, få det vigtigste overblik, og tilmeld dig uden unødige omveje.
              </p>
              <Link className={styles.aboutAudienceCta} to="/events">
                Udforsk kommende events →
              </Link>
            </article>
            <article className={`${styles.aboutAudienceCard} ${styles.aboutAudienceCardLime}`}>
              <span>For arrangører</span>
              <h3>Gør oplevelsen synlig</h3>
              <p className={styles.aboutAudienceCopy}>
                Del events med et nysgerrigt publikum, og få overblik over de mennesker, der tilmelder sig.
              </p>
              <a className={styles.aboutAudienceCta} href="mailto:hej@mellemrum.dk">
                Tal med os om et event →
              </a>
            </article>
          </div>
        </section>

        <section className={styles.aboutFlowSection} aria-labelledby="about-flow-title">
          <div className={styles.aboutSectionHeading}>
            <p className="eyebrow dark">Sådan hænger det sammen</p>
            <h2 id="about-flow-title">Fra idé til plads i kalenderen.</h2>
          </div>
          <ol className={styles.aboutFlowList}>
            <li>
              <span className={styles.aboutFlowBadge}>1</span>
              <strong>Arrangører deler events</strong>
              <p>Oplevelsen får en tydelig plads på platformen.</p>
            </li>
            <li>
              <span className={styles.aboutFlowBadge}>2</span>
              <strong>Brugere opdager</strong>
              <p>Søgning, kategorier og kuratering gør det lettere at vælge.</p>
            </li>
            <li>
              <span className={styles.aboutFlowBadge}>3</span>
              <strong>Brugere tilmelder sig</strong>
              <p>Fra interesse til tilmelding i ét sammenhængende flow.</p>
            </li>
          </ol>
        </section>

        <section className={styles.aboutCity} aria-labelledby="about-city-title">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1532370778713-1400f3d62094?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Moderne arkitektur med lyse facader og turkise altaner"
            />
            <figcaption>Byrum, arkitektur og nye perspektiver.</figcaption>
          </figure>
          <div className={styles.aboutCityCard}>
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
