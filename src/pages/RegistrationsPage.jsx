import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as registrationAdminService from "../services/registrationAdminService";
import { formatShortDate } from "../utils/formatDate";
import { supabaseAuth } from "../lib/supabaseAuthClient";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";
import styles from "../styles/shared/Admin.module.css";

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
        const data = await registrationAdminService.getAll();
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
      <header className={styles.adminHeader}>
        <p className="eyebrow">Internt overblik</p>
        <h1>Tilmeldinger</h1>
        <p>{registrations.length} tilmeldinger i alt</p>
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
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
              <div className={styles.registrationTableWrapper}>
                <table className={styles.registrationList}>
                  <thead>
                    <tr className={`${styles.registrationRow} ${styles.registrationLabels}`}>
                      <th scope="col">Navn</th>
                      <th scope="col">Event</th>
                      <th scope="col">Dato</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((registration) => (
                      <tr className={styles.registrationRow} key={registration.id}>
                        <td>
                          <strong>{registration.name}</strong>
                          <small>{registration.email}</small>
                        </td>
                        <td>{registration.eventTitle}</td>
                        <td>{formatShortDate(registration.eventDate)}</td>
                        <td>
                          <span className={styles.status}>{registration.status}</span>
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
