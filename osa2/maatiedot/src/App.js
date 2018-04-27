import React from 'react';
import axios from 'axios';

const Country = ({country}) => {
  return(
    <li>{country}</li>
  )
}

const CountryList = ({countries}) => {
  if (countries.length > 10)
  return(
    <p>too many matches, specify another filter</p>
  )
  if (countries.length === 1)
    return (
      <div>
        <h1>{countries[0].name} {countries[0].altSpellings[1]}</h1>
        <p>capital: {countries[0].capital}</p>
        <p>population: {countries[0].population}</p>
        <img src={countries[0].flag} alt="country flag"/>
      </div>
  )
  return(
    <ul>
    {countries.map(item =><Country key={item.numericCode} country={item.name} />)}
  </ul>
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
        console.log(responce.data)
        this.setState({ countries: responce.data })
      })
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value })
  }



  render() {
    return (
      <div>
        find Countries: 
        <input value={this.state.country}
        onChange={this.handleCountryChange}/>
        <CountryList
          countries={this.state.countries.filter(item => item.name.toLowerCase().includes(this.state.country.toLowerCase()))}
        />
      </div>
    )
  }
}



export default App;
