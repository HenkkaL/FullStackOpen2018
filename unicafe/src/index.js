import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Header = ({ header }) => {
    return (
        <h1>{header}</h1>
    )
}

const Statistic = ({stat, text, text2 }) => {
    return (
            <p>{text}{stat}{text2}</p>  
    )
}
const Statistics = ({sum, all, positive, neutral, negative}) => {
    if (all === 0)
    return (
        <div>
            <Header header="statistiikka"/>
            <Statistic text="ei yhtään palautetta annettu"/>
        </div>
    )
    return (
        <div>
            <Header header="statistiikka" />
            <table>
                <tbody>
                    <tr>
                        <td><Statistic text="Hyvä: "/></td>
                        <td><Statistic stat={positive} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text="Neutraali: "/></td>
                        <td><Statistic stat={neutral} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text="Huono: "/></td>
                        <td><Statistic stat={negative} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text="Keskiarvo: "/></td>
                        <td><Statistic stat={sum / all} /></td>
                    </tr>
                    <tr>
                        <td><Statistic text="Positiivisia: "/></td>
                        <td><Statistic stat={positive / all} text2="%" /></td>
                    </tr>
                    
                    
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            kaikki: 0, 
            summa: 0
        }
    }
    
    lisaaTulos = (nappi, arvo) => {
        return () => {
            this.setState({ [nappi]: this.state[nappi] + 1 })
            this.setState({ kaikki: this.state.kaikki + 1})
            this.setState({ summa: this.state.summa + arvo})
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Header header="anna palautetta"/>
                    <Button handleClick={ this.lisaaTulos("hyva", 1) } text="Hyvä"/>
                    <Button handleClick={ this.lisaaTulos("neutraali", 0) } text="Neutraali"/>
                    <Button handleClick={ this.lisaaTulos("huono", -1) } text="Huono"/>           
                </div>
                    <Statistics positive={this.state.hyva } neutral={this.state.neutraali }
                    negative={this.state.huono } sum={ this.state.summa } all={ this.state.kaikki }
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('root'))
