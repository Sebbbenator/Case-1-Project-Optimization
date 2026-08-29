import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as eventsService from "../services/eventsService";
import { formatEventDate } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";
import styles from "./EventsPage.module.css";
import cardStyles from "../styles/shared/EventCard.module.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await eventsService.getAll();
        setEvents(data);
      } catch (error) {
        setErrorMessage(error.message || "Der opstod en fejl under indlæsning af events.");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categories = ["Alle", ...new Set(events.map((event) => event.category))];

  const filteredEvents = events.filter((event) => {
    const searchText = `${event.title} ${event.summary} ${event.venue.name}`.toLowerCase();
    const matchesSearch = searchText.includes(search.toLowerCase());
    const matchesCategory = category === "Alle" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <header
        className={styles.eventsHeader}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1595146463222-19603449c6af?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
        }}
      >
        <p className="eyebrow">Det sker snart</p>
        <h1>Kommende events</h1>
        <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
      </header>

      <main>
        <StatusMessage>{isLoading && "Indlæser events..."}</StatusMessage>
        <StatusMessage type="error">{errorMessage}</StatusMessage>

        {!isLoading && !errorMessage && (
          <>
            <section className={styles.filterCard}>
              <label className={styles.searchField}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="visually-hidden">Søg</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Søg efter titel eller sted"
                />
              </label>

              <div className={styles.categoryPills} role="group" aria-label="Filtrer efter kategori">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`${styles.categoryPill}${category === item ? ` ${styles.active}` : ""}`}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

            {filteredEvents.length === 0 ? (
              <StatusMessage>Ingen events matcher din søgning.</StatusMessage>
            ) : (
              <section className={styles.eventGrid}>
                {filteredEvents.map((event) => (
                  <article className={cardStyles.eventCard} key={event.id}>
                    <img src={event.image} alt={event.title} loading="lazy" />
                    <div className={cardStyles.eventCardContent}>
                      <p className={cardStyles.eventCategory}>{event.category}</p>
                      <h3>{event.title}</h3>
                      <p>{event.summary}</p>
                      <div className={cardStyles.eventMeta}>
                        <span>{formatEventDate(event.date)}</span>
                        <span className="meta-divider" aria-hidden="true"></span>
                        <span>{event.venue.name}</span>
                      </div>
                      <Link className={cardStyles.cardLink} to={`/events/${event.id}`}>
                        Læs mere
                      </Link>
                    </div>
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
