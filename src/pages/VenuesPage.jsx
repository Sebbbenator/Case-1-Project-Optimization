import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as venuesService from "../services/venuesService";
import { formatEventDate } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

export default function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadVenues() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await venuesService.getAll();
        setVenues(data);
      } catch (error) {
        setErrorMessage(error.message || "Der opstod en fejl under indlæsning af steder.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVenues();
  }, []);

  return (
    <>
      <header
        className="venues-header"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1595146463222-19603449c6af?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
        }}
      >
        <p className="eyebrow">Steder</p>
        <h1>Hvor det sker</h1>
        <p>De faste rammer bag jeres kommende events i Aarhus.</p>
      </header>

      <main>
        <StatusMessage>{isLoading && "Indlæser steder..."}</StatusMessage>
        <StatusMessage type="error">{errorMessage}</StatusMessage>

        {!isLoading &&
          !errorMessage &&
          (venues.length === 0 ? (
            <StatusMessage>Ingen steder fundet.</StatusMessage>
          ) : (
            <section className="venue-grid">
              {venues.map((venue) => (
                <article className="venue-card" key={venue.id}>
                  <h2>{venue.name}</h2>
                  <p className="venue-address">
                    {venue.address}, {venue.postalCode} {venue.city}
                  </p>
                  {venue.website && (
                    <a className="venue-website" href={venue.website}>
                      Besøg hjemmeside
                    </a>
                  )}
                  {venue.events.length > 0 && (
                    <ul className="venue-event-list">
                      {venue.events.map((event) => (
                        <li key={event.id}>
                          <Link to={`/events/${event.id}`}>{event.title}</Link>
                          <span className="meta-divider" aria-hidden="true"></span>
                          <span>{formatEventDate(event.date)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </section>
          ))}
      </main>
      <Footer />
    </>
  );
}
