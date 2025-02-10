import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard-pages/Dashboard";
import Events from "./components/dashboard-pages/Events";
import EventDashboard from "./components/dashboard-pages/DashboardHome";
import EventDetails from "./components/dashboard-pages/EventDetails";
import SignUpForm from "./pages/Signup";
import SignInForm from "./pages/Signin";
import CreateEvent from "./components/dashboard-pages/CreateEventModal";
import EditEvent from "./components/dashboard-pages/EditEvent";
import Logout from "./components/Logout";
import AllEvents from "./components/landing-page/AllEvents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/events/all" element={<AllEvents />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<EventDashboard />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="analytics" element={<h1>No Analytics Yet</h1>} />
          <Route path="events" element={<Events />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="event/edit/:id" element={<EditEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
