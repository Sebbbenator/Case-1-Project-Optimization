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
    return <StatusMessage>Indlæser event...</StatusMessage>;
  }

  if (notFound) {
    return <NotFoundPage />;
  }

  if (loadErrorMessage) {
    return <StatusMessage type="error">{loadErrorMessage}</StatusMessage>;
  }

  return (
    <>
      <main className="event-page">
        <Link className="back-link" to="/">
          ← Alle events
        </Link>

        <section className="event-detail">
          <img src={event.image} alt="" />
          <div className="event-detail-content">
            <p className="event-category">{event.category}</p>
            <h1>{event.title}</h1>
            <p className="lead">{event.summary}</p>
            <div className="detail-list">
              <p>
                <strong>Dato</strong>
                {formatEventDateTime(event.date)}
              </p>
              <p>
                <strong>Sted</strong>
                <span>
                  {event.venue.name}
                  <br />
                  {event.venue.address}, {event.venue.postalCode} {event.venue.city}
                  {event.venue.website && (
                    <>
                      <br />
                      <a href={event.venue.website}>Besøg venue</a>
                    </>
                  )}
                </span>
              </p>
              <p>
                <strong>Pris</strong>
                {event.price === 0 ? "Gratis" : `${event.price} kr.`}
              </p>
            </div>
            <p>{event.description}</p>
          </div>
        </section>

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
