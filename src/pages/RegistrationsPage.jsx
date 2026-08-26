import { useEffect, useState } from "react";
import * as registrationsService from "../services/registrationsService";
import { formatShortDate } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadRegistrations() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await registrationsService.getAll();
        setRegistrations(data);
      } catch (error) {
        setErrorMessage(error.message || "Der opstod en fejl under indlæsning af tilmeldinger.");
      } finally {
        setIsLoading(false);
      }
    }

    loadRegistrations();
  }, []);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrations.length} tilmeldinger i alt</p>
      </header>
      <main>
        <StatusMessage>{isLoading && "Indlæser tilmeldinger..."}</StatusMessage>
        <StatusMessage type="error">{errorMessage}</StatusMessage>

        {!isLoading && !errorMessage && (
          <>
            {registrations.length === 0 ? (
              <StatusMessage>Ingen tilmeldinger endnu.</StatusMessage>
            ) : (
              <div className="registration-list">
                <div className="registration-row registration-labels">
                  <span>Navn</span>
                  <span>Event</span>
                  <span>Dato</span>
                  <span>Status</span>
                </div>
                {registrations.map((registration) => (
                  <div className="registration-row" key={registration.id}>
                    <div>
                      <strong>{registration.name}</strong>
                      <small>{registration.email}</small>
                    </div>
                    <span>{registration.eventTitle}</span>
                    <span>{formatShortDate(registration.eventDate)}</span>
                    <span className="status">{registration.status}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
