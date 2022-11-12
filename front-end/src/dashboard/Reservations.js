import React from "react";
import { Link } from "react-router-dom";
import { changeStatus } from "../utils/api";

function Reservations( { reservations, setRerender } ) {
  
  const handleCancel = (event) => {
    if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')){
      const reservationId = event.target.getAttribute('data-reservation-id-cancel');
      changeStatus(reservationId, 'cancelled')
        .then(() => setRerender((cur) => !cur))
    }
  }

  return (
    <>
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
                  <th>Party</th>
                  <th>Status</th>
                </tr>
                <tr>
                  <td>{reservation.reservation_id}</td>
                  <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                  <td>{reservation.mobile_number}</td>
                  <td>{reservation.people}</td>
                  <td>
                    <div data-reservation-id-status={reservation.reservation_id}>
                      {reservation.status}
                    </div>
                    <div>
                      {reservation.status !== 'seated' ? <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link> : null }
                    </div>
                  </td>
                  <td>
                    <div>
                      <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel} >Cancel</button>
                    </div>
                    <div>
                      <Link
                        to={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        Edit
                      </Link>
                    </div>
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
