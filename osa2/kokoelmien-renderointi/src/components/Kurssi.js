import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({otsikko}) => {
    return (
        <h1>{otsikko}</h1>
    )
}

const Osa = ({osa}) => {
    return (
        <li>{osa.nimi} {osa.tehtavia}</li>
    )
}

const Sisalto = ({osat}) => {
    return (
        <ul>
            {osat.map(item => <Osa key={item.id} osa={item} />)}
        </ul>
    )
}

const Yhteensa =({osat}) => {
    const tehtavat = osat.map(item => item.tehtavia)
    const reducer = (accumulator, currentVal) => accumulator + currentVal; 
    return (
        <p>Yhteensä {tehtavat.reduce(reducer)} tehtävää</p>
    )
}

const Kurssi = ({kurssi}) => {
    return (
        <div>
            <Otsikko otsikko={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi