import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { Link, useLocation } from "react-router-dom";
import Tables from "./Tables";
import Reservations from "./Reservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const location = useLocation();
  const query = location.search.slice(location.search.indexOf('=') + 1)
  if (location.search) {
    date = query;
  }

  const [dateDisplayed, setDateDisplayed] = useState(date);
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [dateDisplayed])
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ dateDisplayed }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleNext = () => {
    setDateDisplayed((cur) => next(cur));
  }
  const handleToday = () => {
    setDateDisplayed(today());
  }
  const handlePrevious = () => {
    setDateDisplayed((cur) => previous(cur));
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateDisplayed}</h4>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.length < 1 ? `No reservations for ${dateDisplayed}` : ""}
      <div>
        <Reservations dateDisplayed={dateDisplayed} setDateDisplayed={setDateDisplayed} reservations={reservations} reservationsError={reservationsError} />
      </div>
      <h4>Tables</h4>
      <div>
        <Tables />
      </div>
    </main>
  )
}


export default Dashboard;