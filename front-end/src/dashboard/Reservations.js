import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { Link, useLocation } from "react-router-dom";

function Reservations({date, dateDisplayed, reservations, reservationsError}) {
  return (
    <>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateDisplayed}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.length < 1 ? `No reservations for ${dateDisplayed}` : ""}
      <div>
        {reservations.map((reservation) => {
          return (
            <div key={reservation.reservation_time}>
              <h4>{reservation.reservation_time}</h4>
              <table style={{ width: "100%", border: "1px solid black" }}>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Party Number</th>
                  <th> </th>
                </tr>
                <tr>
                  <td>{reservation.reservation_id}</td>
                  <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.people}</td>
                  <td>
                    <Link
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      Seat
                    </Link>
                  </td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Reservations;
