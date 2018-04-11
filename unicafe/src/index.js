import React from 'react';
import ReactDOM from 'react-dom';

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
                    <h1>anna palautetta</h1>
                    <button onClick={ this.kasvataHyva } >Hyvä</button>
                    <button onClick={ this.kasvataNeutraali } >Neutraali</button>
                    <button onClick={ this.kasvataHuono } >Huono</button>                    
                </div>
                <div>
                    <h1>statistiikka</h1>   
                    <p>Hyvä: {this.state.hyva }</p>
                    <p>Neutraali: {this.state.neutraali }</p>
                    <p>Huono: {this.state.huono }</p>                    
                    <p>Keskiarvo: { this.state.summa / this.state.kaikki }</p>
                    <p>Positiivisia: {this.state.hyva / this.state.kaikki }%</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('root'))
