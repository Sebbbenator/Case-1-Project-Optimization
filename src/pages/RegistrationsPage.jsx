import { useEffect, useState } from "react";
import * as registrationsService from "../services/registrationsService";
import { formatShortDate } from "../utils/formatDate";
import Footer from "../components/Footer";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    async function loadRegistrations() {
      const data = await registrationsService.getAll();
      setRegistrations(data);
      setRegistrationCount(data.length);
    }

    loadRegistrations();
  }, []);

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrationCount} tilmeldinger i alt</p>
      </header>
      <main>
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
      </main>
      <Footer />
    </>
  );
}
