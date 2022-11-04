import React, { useEffect, useState } from "react";
import { listTables } from '../utils/api';

function Tables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  
  useEffect(loadTables, [])
  function loadTables() {
    const abortController = new AbortController();
    listTables()
      .then(setTables)
      .catch(setTablesError)
  }

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
                  {table.reservation_id ? `Occupied: Reservation ${table.reservation_id}` : 'Free'}
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