import React from "react";
import { useHistory } from "react-router-dom";

function FormReservation( { handleSubmit, handleChange, reservation } ) {

  const history = useHistory();
  
  return (
    <form name='newreservation' onSubmit={handleSubmit} >
        <div>
          <label htmlFor='first_name'>
            First Name
            <br/>
            <input id='first_name' name='first_name' type='text' onChange={handleChange} value={reservation.first_name} required />
          </label>
        </div>
        <div>
          <label htmlFor='last_name'>
            Last Name
            <br />
            <input id='last_name' name='last_name' type='text' onChange={handleChange} value={reservation.last_name} required />
          </label>
        </div>
        <div>
          <label htmlFor='mobile_number'>
            Mobile Number
            <br/>
            <input id='mobile_number' name="mobile_number" type='tel' onChange={handleChange} value={reservation.mobile_number} required />
          </label>
        </div>
        <div>
          <label htmlFor='reservation_date'>
            Reservation Date
            <br/>
            <input id='reservation_date' name='reservation_date' type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" onChange={handleChange} value={reservation.reservation_date} required />
          </label>
        </div>
        <div>
          <label htmlFor='reservation_time'>
            Reservation Time
            <br/>
            <input id='reservation_time' name='reservation_time' type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}" onChange={handleChange} value={reservation.reservation_time} required />
          </label>
        </div>
        <div>
          <label htmlFor='people'>
            Party Size
            <br/>
            <input id='people' name='people' type='number' min='1' onChange={handleChange} value={reservation.people} required />
          </label>
        </div>
        <div>
          <button onClick={history.goBack}>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
  )
}

export default FormReservation;