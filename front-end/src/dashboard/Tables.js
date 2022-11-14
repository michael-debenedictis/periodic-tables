import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, reservationFinish } from '../utils/api';

function Tables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  };

  const handleFinish = (event) => {
    if (window.confirm('Is this table ready to seat new guests? This cannot be undone.')) {
      const tableId = event.target.id;
      reservationFinish(tableId)
        .then(() => window.location.reload())
    }
  };

  return (
    <>
      <ErrorAlert error={tablesError} />
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
                <div data-table-id-status={table.table_id} >
                  {table.reservation_id ? `occupied: Reservation ${table.reservation_id}` : "free "}
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