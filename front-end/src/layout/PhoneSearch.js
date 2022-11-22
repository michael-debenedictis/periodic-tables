import React, { useState } from "react";
import { listReservations } from "../utils/api";
import Reservations from '../dashboard/Reservations';

function Search() {

  const [reservations, setReservations] = useState([])
  const [hasClicked, setHasClicked] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneNumber = event.target.mobile_number.value;
    listReservations( {mobile_number: phoneNumber} )
      .then((res) => {
        if (res) setReservations(res);
      })
      .then(() => setHasClicked(true));
  }

  return (
    <>
      <h1>Search reservation by phone</h1>
      <div className='space' >
        <form name='phonesearch' onSubmit={handleSubmit}>
          <input id='mobile_number' name='mobile_number' type='text' />
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