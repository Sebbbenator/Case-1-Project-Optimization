import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabaseAuth } from "../lib/supabaseAuthClient";
import StatusMessage from "./StatusMessage";

export default function RequireAuth({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabaseAuth.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription }
    } = supabaseAuth.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <StatusMessage>Tjekker login...</StatusMessage>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
