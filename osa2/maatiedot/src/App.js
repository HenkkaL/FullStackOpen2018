import React from 'react';
import axios from 'axios';


const CountryDetail = ({country}) => {
  return(
    <div>
    <h1>{country.name} {country.altSpellings[1]}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} alt="country flag"/>
  </div>
  )
}

const CountryList = ({countries}) => {
  if (countries.length > 10)
  return(
    <p>too many matches, specify another filter</p>
  )
  if (countries.length === 1)
    return (
      <CountryDetail country={countries[0]} />
  )
  return(
    <div>
    {countries.map(item =><div key={item.numericCode} onClick={item.event}>{item.name} </div>)}
  </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      country: ''
    }
  }


  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(responce => {
        this.setState({ countries: responce.data })
      })
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value })
    console.log(this.state.countries)
  }
 
  eventHandler = (param) => {
    return () => {
      this.setState({ country: param.name })
    }    
  }

  render() {   
    const countries= this.state.countries.filter(item => item.name.toLowerCase().includes(this.state.country.toLowerCase()))
    countries.map(item => item.event = this.eventHandler(item))
    return (
      <div>
        find Countries: 
        <input value={this.state.country}
        onChange={this.handleCountryChange}/>
        <CountryList          
          countries={countries}
        />
      </div>
    )
  }
}



export default App;
