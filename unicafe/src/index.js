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
    if (all == 0)
    return (
        <div>
            <Header header="statistiikka"/>
            <Statistic text="ei yhtään palautetta annettu"/>
        </div>
    )
    return (
        <div>
            <Header header="statistiikka"/>
            <Statistic text="Hyvä: " stat={positive}/>
            <Statistic text="Neutraali: " stat={neutral}/>
            <Statistic text="Huono: " stat={negative}/>
            <Statistic text="Keskiarvo: " stat={sum / all}/>
            <Statistic text="Positiivisia: " stat={positive / all} text2="%"/>
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
    
    kasvataHyva = () => {
        this.setState({ hyva: this.state.hyva + 1 })
        this.setState({ kaikki: this.state.kaikki + 1})
        this.setState({ summa: this.state.summa + 1})
    }

    kasvataNeutraali = () => {
        this.setState({ neutraali: this.state.neutraali + 1 })
        this.setState({ kaikki: this.state.kaikki + 1})
    }

    kasvataHuono = () => {
        this.setState({ huono: this.state.huono + 1 })
        this.setState({ kaikki: this.state.kaikki + 1})
        this.setState({ summa: this.state.summa - 1})
    }

    render() {
        return (
            <div>
                <div>
                    <Header header="anna palautetta"/>
                    <Button handleClick={ this.kasvataHyva } text="Hyvä"/>
                    <Button handleClick={ this.kasvataNeutraali } text="Neutraali"/>
                    <Button handleClick={ this.kasvataHuono } text="Huono"/>           
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
