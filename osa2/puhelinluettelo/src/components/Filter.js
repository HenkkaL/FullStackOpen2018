import React from 'react';

const Filter = (props) => {
    return (
        <div>
            <h2>Puhelinluettelo</h2>
            rajaa näytettäviä: <input
             value={props.filter}
             onChange={props.filterChange}
             />
        </div>
    )
}

export default Filter