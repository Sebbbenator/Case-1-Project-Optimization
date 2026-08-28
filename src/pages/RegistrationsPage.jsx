import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as registrationsService from "../services/registrationsService";
import { formatShortDate } from "../utils/formatDate";
import { supabaseAuth } from "../lib/supabaseAuthClient";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

export default function RegistrationsPage() {
  const navigate = useNavigate();
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

  async function handleLogout() {
    await supabaseAuth.auth.signOut();
    navigate("/login");
  }

  return (
    <>
      <header className="admin-header">
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrations.length} tilmeldinger i alt</p>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Log ud
        </button>
      </header>
      <main>
        <StatusMessage>{isLoading && "Indlæser tilmeldinger..."}</StatusMessage>
        <StatusMessage type="error">{errorMessage}</StatusMessage>

        {!isLoading && !errorMessage && (
          <>
            {registrations.length === 0 ? (
              <StatusMessage>Ingen tilmeldinger endnu.</StatusMessage>
            ) : (
              <div className="registration-table-wrapper">
                <table className="registration-list">
                  <thead>
                    <tr className="registration-row registration-labels">
                      <th scope="col">Navn</th>
                      <th scope="col">Event</th>
                      <th scope="col">Dato</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => (
                      <tr className="registration-row" key={registration.id}>
                        <td>
                          <strong>{registration.name}</strong>
                          <small>{registration.email}</small>
                        </td>
                        <td>{registration.eventTitle}</td>
                        <td>{formatShortDate(registration.eventDate)}</td>
                        <td>
                          <span className="status">{registration.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
