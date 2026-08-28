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
      <main>
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Steder</p>
            <h1>Hvor det sker</h1>
          </div>
          <p>De faste rammer bag jeres kommende events i Aarhus.</p>
        </section>

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
