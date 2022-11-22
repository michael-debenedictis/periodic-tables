import React from "react";
import '../style.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import FormReservation from "./FormReservation";

function NewReservation() {
  const history = useHistory();

  const reservationInitial = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 0
  }

  const [reservation, setReservation] = useState({...reservationInitial})

  const [newReservationError, setNewReservationError] = useState(null);

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
    const abortController = new AbortController();
    createReservation(reservation, abortController.signal)
      .then(() => {
        setReservation({...reservationInitial})
        history.push(`/dashboard?date=${reservation.reservation_date}`)
      })
      .catch(setNewReservationError);
    return () => abortController.abort();
  };

  return (
    <>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={newReservationError} />
      <FormReservation handleSubmit={handleSubmit} handleChange={handleChange} reservation={reservation} />
    </>
  )
}

export default NewReservation;