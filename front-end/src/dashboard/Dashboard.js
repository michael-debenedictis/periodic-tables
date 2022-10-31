import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { useLocation } from "react-router-dom";

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
      {reservations.length < 1 ? `No reservations for ${dateDisplayed}` : ''}
      <div>
        {reservations.map((reservation) => {
          return (
            <div key={reservation.reservation_time}>
              <h4>{reservation.reservation_time}</h4>
              <table style={{width: '100%', border: '1px solid black'}} >
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Party Number</th>
                </tr>
                <tr>
                  <td>{reservation.reservation_id}</td>
                  <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.people}</td>
                </tr>
              </table>
            </div>
          )
        })}
      </div>
    </main>
  );
}


export default Dashboard;