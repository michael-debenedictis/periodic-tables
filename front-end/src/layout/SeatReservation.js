import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, seatReservation, readReservation, changeStatus } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const params = useParams();
  const reservationId = Number(params.reservationId);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservation, setReservation] = useState({});
  const [reservationError, setReservationError] = useState(null);
  const [tableUpdatedError, setTableUpdatedError] = useState(null);

  useEffect(loadReservation, []);
  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservationId)
      .then(setReservation)
      .catch(setReservationError);
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables()
      .then(setTables)
      .catch(setTablesError);
  }

  ////////
  const handleSubmit = (event) => {
    event.preventDefault();
    const reservationId = reservation.reservation_id;
    const tableId = event.target.table_id.value;
    seatReservation(tableId, reservationId)
      .then(() => changeStatus(reservationId, 'seated'))
      .then(() => history.push('/dashboard'))
      .catch(setTableUpdatedError)
  };

  return (
    <>
      <h3>Reservation:</h3>
      <ErrorAlert error={tableUpdatedError} />
      <div>
        <table style={{ width: "100%", border: "1px solid black" }}>
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
        <h3>Seat:</h3>
      </div>
      <form name="seatreservation" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="table_number">
            Table Number:
            <select name="table_id">
              {tables.map((table) => {
                // if (reservation.people <= table.capacity && table.reservation_id === null) {
                  return (
                    <option key={table.table_id} value={table.table_id}>
                      {table.table_name} - {table.capacity}
                    </option>
                  );
              })}
            </select>
          </label>
        </div>
        <div>
          <button type="submit">Seat</button>
        </div>
      </form>
    </>
  );
}

export default SeatReservation;
