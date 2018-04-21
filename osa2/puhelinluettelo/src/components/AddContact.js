import React from 'react';

const AddContact = (props) => {
    return (
        <div>
            <h2>Lisää uusi</h2>
            <form onSubmit={props.onSubmit}>
                <div>
                    nimi: <input
                        value={props.name}
                        onChange={props.handleName}
                    />
                </div>
                <div>
                    numero: <input
                        value={props.number}
                        onChange={props.handleNumber}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </div>
    )
}

export default AddContact