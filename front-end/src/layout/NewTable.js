import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from '../utils/api';
import ErrorAlert from "./ErrorAlert";

function NewTable() {
  const history = useHistory();
  const [tableName, setTableName] = useState('');
  const [capacity, setCapacity] = useState(0);

  const [newTableError, setNewTableError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const table = {
      table_name: event.target.table_name.value,
      capacity: Number(event.target.capacity.value),
    };
    const abortController = new AbortController();
    createTable(table, abortController.signal)
      .then(() => {
        setTableName('');
        setCapacity(1);
        history.push('/dashboard')
      })
      .catch(setNewTableError);
    return () => abortController.abort();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    switch(event.target.id) {
      case 'table_name':
        setTableName(value);
        break;
      case 'capacity':
        setCapacity(value);
        break;
      default:
    };
  };

  return (
    <>
      <h1>Create a new table</h1>
      <div className='space' >
        <ErrorAlert error={newTableError} />
        <form name='newtable' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='table_name'>
              Table Name
              <br/>
              <input id='table_name' name='table_name' type='text' minLength='2' onChange={handleChange} value={tableName} placeHolder='table name' required />
            </label>
          </div>
          <div>
            <label htmlFor='capacity'>
              Capacity
              <br/>
              <input id='capacity' name='capacity' type='number' min='1' onChange={handleChange} value={capacity} required />
            </label>
          </div>
          <div>
            <button onClick={history.goBack}>Cancel</button>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewTable;