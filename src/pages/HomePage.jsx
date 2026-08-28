import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as eventsService from "../services/eventsService";
import * as venuesService from "../services/venuesService";
import { formatEventDate } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");

  const [venues, setVenues] = useState([]);
  const [isLoadingVenues, setIsLoadingVenues] = useState(true);
  const [venuesError, setVenuesError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      setIsLoadingEvents(true);
      setEventsError("");

      try {
        const data = await eventsService.getAll();
        setEvents(data);
      } catch (error) {
        setEventsError(error.message || "Der opstod en fejl under indlæsning af events.");
      } finally {
        setIsLoadingEvents(false);
      }
    }

    loadEvents();
  }, []);

  useEffect(() => {
    async function loadVenues() {
      setIsLoadingVenues(true);
      setVenuesError("");

      try {
        const data = await venuesService.getAll();
        setVenues(data);
      } catch (error) {
        setVenuesError(error.message || "Der opstod en fejl under indlæsning af steder.");
      } finally {
        setIsLoadingVenues(false);
      }
    }

    loadVenues();
  }, []);

  const featuredEvents = events.slice(0, 3);
  const featuredVenues = venues.slice(0, 3);

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

      <main className="home-sections">
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Det sker snart</p>
            <h2>Udvalgte events</h2>
          </div>
          <Link className="card-link" to="/events">
            Se alle events →
          </Link>
        </section>

        <StatusMessage>{isLoadingEvents && "Indlæser events..."}</StatusMessage>
        <StatusMessage type="error">{eventsError}</StatusMessage>

        {!isLoadingEvents &&
          !eventsError &&
          (featuredEvents.length === 0 ? (
            <StatusMessage>Ingen events at vise endnu.</StatusMessage>
          ) : (
            <section className="event-grid">
              {featuredEvents.map((event) => (
                <article className="event-card" key={event.id}>
                  <img src={event.image} alt={event.title} loading="lazy" />
                  <div className="event-card-content">
                    <p className="event-category">{event.category}</p>
                    <h3>{event.title}</h3>
                    <p>{event.summary}</p>
                    <div className="event-meta">
                      <span>{formatEventDate(event.date)}</span>
                      <span>{event.venue.name}</span>
                    </div>
                    <Link className="card-link" to={`/events/${event.id}`}>
                      Læs mere
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          ))}

        <section className="venues-teaser">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Hvor det sker</p>
              <h2>Udforsk stederne</h2>
            </div>
            <Link className="hero-link" to="/steder">
              Se alle steder →
            </Link>
          </div>

          <StatusMessage>{isLoadingVenues && "Indlæser steder..."}</StatusMessage>
          <StatusMessage type="error">{venuesError}</StatusMessage>

          {!isLoadingVenues &&
            !venuesError &&
            (featuredVenues.length === 0 ? (
              <StatusMessage>Ingen steder at vise endnu.</StatusMessage>
            ) : (
              <div className="venues-teaser-grid">
                {featuredVenues.map((venue) => (
                  <article className="venues-teaser-card" key={venue.id}>
                    <h3>{venue.name}</h3>
                    <p>
                      {venue.address}, {venue.postalCode} {venue.city}
                    </p>
                  </article>
                ))}
              </div>
            ))}
        </section>

        <section className="about-teaser">
          <p className="eyebrow dark">Idéen</p>
          <h2>En enkel vej til det, der sker tæt på.</h2>
          <p>
            Mellemrum samler koncerter, talks, workshops og fællesskaber, så du lettere kan opdage noget, du ikke
            allerede kendte.
          </p>
          <Link className="about-cta" to="/om">
            Læs mere om Mellemrum →
          </Link>
        </section>

        <section className="organizer-cta">
          <div>
            <h2>Er du arrangør?</h2>
            <p>Del dit event med et nysgerrigt publikum, og få overblik over dem, der tilmelder sig.</p>
          </div>
          <Link className="about-cta" to="/kontakt">
            Kontakt os →
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
