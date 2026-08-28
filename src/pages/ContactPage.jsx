import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <header className="contact-header">
        <p className="eyebrow">Kontakt</p>
        <h1>Skriv til os.</h1>
        <p>Uanset om du er nysgerrig, vil tilmelde dig, eller er arrangør — hører vi gerne fra dig.</p>
      </header>

      <main className="contact-row">
        <div className="contact-path">
          <h2>Har du et spørgsmål?</h2>
          <p>Om et event, en tilmelding, eller bare nysgerrig på platformen.</p>
          <a className="contact-cta" href="mailto:hej@mellemrum.dk">
            hej@mellemrum.dk →
          </a>
        </div>
        <span className="contact-divider" aria-hidden="true"></span>
        <div className="contact-path">
          <h2>Er du arrangør?</h2>
          <p>Vil du dele et event, eller nå ud til vores publikum?</p>
          <a className="contact-cta" href="mailto:hej@mellemrum.dk">
            Tal med os om et event →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
