import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi}</h1>
    )
}

const Sisalto = (props) => {
    const sisalto = props.osat.map((osa, index) => <Osa key={index} osa={osa} />)
    return (
        <div>
            {sisalto}
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    let sum = 0
    props.osat.forEach(element => {
        sum += element.tehtavia
    });
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
            },
            {
            nimi: 'Komponenttien tila',
            tehtavia: 14
            }
        ]
    } 

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />  
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
} 

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
