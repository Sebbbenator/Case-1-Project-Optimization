import { useState } from "react";
import { useNavigate } from "react-router";
import { supabaseAuth } from "../lib/supabaseAuthClient";
import StatusMessage from "../components/StatusMessage";
import Footer from "../components/Footer";
import usePageTitle from "../hooks/usePageTitle";
import adminStyles from "../styles/shared/Admin.module.css";
import panelStyles from "../styles/shared/SignupPanel.module.css";

export default function LoginPage() {
  usePageTitle("Log ind | Mellemrum");

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const { error } = await supabaseAuth.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage("Forkert e-mail eller adgangskode.");
      setIsSubmitting(false);
      return;
    }

    navigate("/tilmeldinger");
  }

  return (
    <>
      <header className={adminStyles.adminHeader}>
        <p className="eyebrow">Internt</p>
        <h1>Log ind</h1>
      </header>
      <main>
        <section className={panelStyles.signupPanel}>
          <div>
            <p className="eyebrow dark">Admin</p>
            <h2>Log ind for at se tilmeldinger</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(inputEvent) => setEmail(inputEvent.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              Adgangskode
              <input
                type="password"
                value={password}
                onChange={(inputEvent) => setPassword(inputEvent.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            <StatusMessage context="form" type="error">
              {errorMessage}
            </StatusMessage>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logger ind..." : "Log ind"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
