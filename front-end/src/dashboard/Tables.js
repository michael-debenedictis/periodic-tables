import React, { useEffect, useState } from "react";
import { changeStatus, listTables, readReservation, reservationFinish, reservationRemove } from '../utils/api';

function Tables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  useEffect(loadTables, [])
  function loadTables() {
    const abortController = new AbortController();
    listTables()
      .then(setTables)
      .catch(setTablesError)
  };

  const handleFinish = (event) => {
    if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
      const tableId = event.target.id;
      const reservationId = event.target.getAttribute('data-reservation-id')
      reservationFinish(tableId)
        .then(() => readReservation(reservationId))
        .then(() => changeStatus(reservationId, 'finished'))
        .then(() => window.location.reload())
    }
  };

  return (
    <>
      <div>
        <ul>
        {tables.map((table) => {
          return (
            <li key={table.table_id}>
              <div>
                <div>
                  Table: {table.table_name}  
                </div> 
                <div>
                  Capacity: {table.capacity} 
                </div>
                <div data-table-id-status={table.table_id}>
                  {table.reservation_id ? `Occupied: Reservation ${table.reservation_id}` : 'free'}
                </div>
                <div>
                  {table.reservation_id ? <button id={table.table_id} data-reservation-id={table.reservation_id} data-table-id-finish={table.table_id} onClick={handleFinish} >Finish</button> : null}
                </div>
              </div>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  );
};

export default Tables;