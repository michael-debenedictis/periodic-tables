import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import FormReservation from "./FormReservation";
import { readReservation, reservationUpdate } from '../utils/api';
import ErrorAlert from "./ErrorAlert";

function ReservationEdit() {

  const history = useHistory();
  const params = useParams();
  const reservationId = params.reservationId;

  const [reservation, setReservation] = useState({});
  const [reservationError, setReservationError] = useState(null);

  const [errorSubmit, setErrorSubmit] = useState(null);

  useEffect(loadReservation, [reservationId]);
  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setReservationError)
    return () => abortController.abort();
  }

  const handleChange = (event) => {
    const value = event.target.value;
    switch(event.target.id) {
      case 'first_name':
        setReservation((cur) => {
          return {
            ...cur,
            first_name: value
          }
        })
        break
      case 'last_name':
        setReservation((cur) => {
          return {
            ...cur,
            last_name: value
          }
        })
        break
      case 'mobile_number':
        setReservation((cur) => {
          return {
            ...cur,
            mobile_number: value
          }
        })
        break
      case 'reservation_date':
        setReservation((cur) => {
          return {
            ...cur,
            reservation_date: value
          }
        })
        break
      case 'reservation_time':
        setReservation((cur) => {
          return {
            ...cur,
            reservation_time: value
          }
        })
        break
      case 'people':
        setReservation((cur) => {
          return {
            ...cur,
            people: Number(value)
          }
        })
        break
      default:
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    reservationUpdate(reservationId, reservation)
      .then(() => history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setErrorSubmit)
  }

  return (
    <>
      <h1>Edit reservation</h1>
      <ErrorAlert error={errorSubmit} />
      <ErrorAlert error={reservationError} />
      <FormReservation handleSubmit={handleSubmit} handleChange={handleChange} reservation={reservation} />
    </>
  )
}

export default ReservationEdit;