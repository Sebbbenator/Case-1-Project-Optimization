import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import StatusMessage from "./components/StatusMessage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import NotFoundPage from "./pages/NotFoundPage";

const RequireAuth = lazy(() => import("./components/RequireAuth"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationsPage = lazy(() => import("./pages/RegistrationsPage"));

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<StatusMessage>Indlæser...</StatusMessage>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventPage />} />
          <Route path="/om" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/tilmeldinger"
            element={
              <RequireAuth>
                <RegistrationsPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
