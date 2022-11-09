import React, { useState } from "react";
import { listReservations } from "../utils/api";
import Reservations from '../dashboard/Reservations';

function Search() {

  const [reservation, setReservation] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    const phoneNumber = event.target.mobile_number.value;
    listReservations( {mobile_number: phoneNumber} )
      .then(setReservation)
  }

  console.log(reservation)

  return (
    <>
      <div>
        <form name='phonesearch' onSubmit={handleSubmit}>
          <input id='mobile_number' name='mobile_number' type='text' />
          <button type='submit'>Search</button>
        </form>
      </div>
      <div>
        
      </div>
    </>
  )
}

export default Search