import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import Reservations from '../dashboard/Reservations';
import ErrorAlert from "./ErrorAlert";

function Search() {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(loadReservations, [hasClicked]);
  function loadReservations(phoneNumber) {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations( {mobile_number: phoneNumber}, abortController.signal )
      .then((res) => {
        if (res) setReservations(res);
      })
      .then(() => setHasClicked(true))
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneNumber = event.target.mobile_number.value;
    loadReservations(phoneNumber);
  }
  return (
    <>
      <h1>Search reservation by phone</h1>
      <div className='space' >
      {reservationsError !== null && reservationsError.toString() !== "TypeError: Cannot read properties of undefined (reading 'toString')" ? <ErrorAlert error={reservationsError} /> : null}
        <form name='phonesearch' onSubmit={handleSubmit}>
          <input style={{width: '250px' }} id='mobile_number' placeholder="Enter a customer's phone number" name='mobile_number' type='text' />
          <button type='submit'>Search</button>
        </form>
      </div>
      {hasClicked ? reservations.length < 1 ? `No reservations found` : "" : null}
      <div>
        <Reservations reservations={reservations} />
      </div>
    </>
  )
}

export default Search