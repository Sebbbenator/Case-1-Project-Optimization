import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as eventsService from "../services/eventsService";
import { formatEventDate } from "../utils/formatDate";
import Footer from "../components/Footer";
import StatusMessage from "../components/StatusMessage";

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
      <main>
        <section className="section-heading">
          <div>
            <p className="eyebrow dark">Det sker</p>
            <h1>Kommende events</h1>
          </div>
          <p>Kuraterede oplevelser i byen – fra små scener til store idéer.</p>
        </section>

        <StatusMessage>{isLoading && "Indlæser events..."}</StatusMessage>
        <StatusMessage type="error">{errorMessage}</StatusMessage>

        {!isLoading && !errorMessage && (
          <>
            <section className="filters">
              <label>
                Søg
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Søg efter titel eller sted"
                />
              </label>
              <label>
                Kategori
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </section>

            {filteredEvents.length === 0 ? (
              <StatusMessage>Ingen events matcher din søgning.</StatusMessage>
            ) : (
              <section className="event-grid">
                {filteredEvents.map((event) => (
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
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
