import React from "react";
import '../style.css';
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
      <div className='space' >
        {reservations.map((reservation) => {
          return (
            <div style={{border: '1px solid', borderRadius: '5px', margin: '3px', padding: '5px'}} key={reservation.reservation_id}>
              <h4>{reservation.reservation_time}</h4>
              <table style={{margin: '0px'}} className='table'>
                <tbody>
                  <tr style={{color: '#2A3A4B'}}>
                    <th scope="col" >Id</th>
                    <th scope='col' >Name</th>
                    <th scope='col' >Mobile Number</th>
                    <th scope='col' >Party</th>
                    <th scope='col' >Status</th>
                  </tr>
                  <tr>
                    <td>{reservation.reservation_id}</td>
                    <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                    <td>{reservation.mobile_number}</td>
                    <td>{reservation.people}</td>
                    <td>
                      <div style={{display: 'flex', justifyContent: 'space-between' }} >
                        <div data-reservation-id-status={reservation.reservation_id}>
                          {reservation.status}
                        </div>
                        <div>
                          {reservation.status !== 'seated' ? <Link className='link-button' to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link> : null }
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{display: 'flex', alignItems: 'center' }} >
                    <div>
                      <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel} >Cancel</button>
                    </div>
                    <div>
                      <Link className='link-button'
                        to={`/reservations/${reservation.reservation_id}/edit`}
                      >
                          Edit
                      </Link>
                    </div>
                  </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Reservations;
