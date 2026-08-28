import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Kontakt</p>
        <h1>Skriv til os.</h1>
      </header>
      <main className="contact-page">
        <section>
          <h2>Har du et spørgsmål?</h2>
          <p>
            Uanset om du er nysgerrig på et event, vil tilmelde dig, eller har feedback til platformen, hører vi
            gerne fra dig.
          </p>
          <a className="about-cta" href="mailto:hej@mellemrum.dk">
            hej@mellemrum.dk
          </a>
        </section>

        <section>
          <h2>Er du arrangør?</h2>
          <p>
            Vil du dele et event på Mellemrum, eller høre mere om, hvordan platformen kan gøre det lettere at nå ud
            til dit publikum? Send os en mail, så finder vi ud af det sammen.
          </p>
          <a className="about-cta" href="mailto:hej@mellemrum.dk">
            Tal med os om et event
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
