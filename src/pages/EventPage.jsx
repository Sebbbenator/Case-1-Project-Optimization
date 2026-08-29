import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import * as eventsService from "../services/eventsService";
import * as registrationsService from "../services/registrationsService";
import { formatEventDateTime } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";
import NotFoundPage from "./NotFoundPage";

export default function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadErrorMessage, setLoadErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadEvent() {
      setIsLoading(true);
      setNotFound(false);
      setLoadErrorMessage("");

      try {
        const data = await eventsService.getById(eventId);

        if (!data) {
          setNotFound(true);
        } else {
          setEvent(data);
        }
      } catch (error) {
        setLoadErrorMessage(error.message || "Der opstod en fejl under indlæsning af eventet.");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  async function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    setSuccessMessage("");

    if (!trimmedName || !trimmedEmail) {
      setValidationError("Udfyld venligst navn og e-mail.");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);
    setSubmitErrorMessage("");

    try {
      await registrationsService.create({
        name: trimmedName,
        email: trimmedEmail,
        status: "Ny",
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventLocation: event.venue.name
      });

      setName("");
      setEmail("");
      setSuccessMessage("Tak! Din tilmelding er modtaget.");
    } catch (error) {
      setSubmitErrorMessage(error.message || "Der opstod en fejl under tilmeldingen.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <>
        <main className="event-page">
          <StatusMessage>Indlæser event...</StatusMessage>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound) {
    return <NotFoundPage />;
  }

  if (loadErrorMessage) {
    return (
      <>
        <main className="event-page">
          <StatusMessage type="error">{loadErrorMessage}</StatusMessage>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <header className="event-hero">
        <div className="event-hero-photo" style={{ backgroundImage: `url(${event.image})` }}>
          <Link className="back-link" to="/events">
            ← Alle events
          </Link>
          <div className="event-hero-content">
            <span className="eyebrow">{event.category}</span>
            <h1>{event.title}</h1>
          </div>
        </div>
      </header>

      <main className="event-page">
        <section className="event-info-row">
          <div>
            <p className="info-label">Dato</p>
            <p className="info-value">{formatEventDateTime(event.date)}</p>
          </div>
          <span className="info-divider" aria-hidden="true"></span>
          <div>
            <p className="info-label">Sted</p>
            <p className="info-value">
              {event.venue.name}
              <br />
              {event.venue.address}, {event.venue.postalCode} {event.venue.city}
            </p>
            {event.venue.website && (
              <a className="info-link" href={event.venue.website}>
                Besøg venue
              </a>
            )}
          </div>
          <span className="info-divider" aria-hidden="true"></span>
          <div>
            <p className="info-label">Pris</p>
            <p className="info-value">{event.price === 0 ? "Gratis" : `${event.price} kr.`}</p>
          </div>
        </section>

        <div className="event-body">
          <p className="lead">{event.summary}</p>
          <p>{event.description}</p>
        </div>

        <section className="signup-panel">
          <div>
            <p className="eyebrow dark">Tilmelding</p>
            <h2>Reserver din plads</h2>
            <p>Udfyld formularen, så sender vi din tilmelding til arrangøren.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Navn
              <input value={name} onChange={(inputEvent) => setName(inputEvent.target.value)} required />
            </label>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(inputEvent) => setEmail(inputEvent.target.value)}
                placeholder="dig@example.com"
                required
              />
            </label>
            <StatusMessage context="form" type="error">
              {validationError || submitErrorMessage}
            </StatusMessage>
            <StatusMessage context="form" type="success">
              {successMessage}
            </StatusMessage>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sender..." : "Tilmeld mig"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
