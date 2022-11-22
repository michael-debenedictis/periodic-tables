import React, { useEffect, useState } from "react";
import '../layout/Layout.css'
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { useLocation } from "react-router-dom";
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

  const [reRender, setRerender] = useState(false);

  const [dateDisplayed, setDateDisplayed] = useState(date);
  
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [dateDisplayed, reRender])
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
    <main >
      <div className='top' >
        <h1>Dashboard</h1>
      </div>
      <div className="d-md-flex mb-3 space" >
        <h4 className="mb-0">Reservations for {dateDisplayed}</h4>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className='space' >
        <hr style={{marginRight: '15px' }} />
        <ErrorAlert error={reservationsError} />
        {reservations.length < 1 ? `No reservations for ${dateDisplayed}` : ""}
        <div style={{ overflow: 'auto', maxHeight: '500px', marginRight: '15px'}} >
          <Reservations reservations={reservations} setRerender={setRerender} />
        </div>
        <hr style={{marginRight: '15px'}} />
        <div style={{backgroundColor: '#EBE9DF', border: 'solid', borderRadius: '15px', marginRight: '15px'}} >
          <h4 style={{padding: '15px', margin: '0px' }} className='table-header'>Tables</h4>
          <hr style={{margin: '0px 35px 0px 35px' }} />
          <div>
            <Tables />
          </div>
        </div>
      </div>
    </main>
  )
}


export default Dashboard;