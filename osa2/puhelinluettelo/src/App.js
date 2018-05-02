import React from 'react';
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(responce => {
        this.setState({persons: responce.data })
      })
  }

  addContact = (event) => {
    event.preventDefault()
    const exists = this.state.persons.filter(item => item.name === this.state.newName).length > 0
    console.log(exists);
    
    if (exists) {
      alert("nimi olemassa")
    } else {
      const contact = {
        name: this.state.newName,
        number: this.state.newNumber
      }   
  
      axios.post('http://localhost:3001/persons', contact)
      .then(responce => {
        this.setState({
          persons: this.state.persons.concat(responce.data),
          newName:'',
          newNumber: ''
        })
      })
  
      
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })    
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })    
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value }) 
    
  }

  render() {
    return (
      <div>        
          <Filter 
            filter={this.state.newFilter} 
            filterChange={this.handleFilterChange}
          />
          <AddContact 
            onSubmit={this.addContact}
            name={this.state.newName}
            handleName={this.handleNameChange}
            number={this.state.newNumber}
            handleNumber={this.handleNumberChange}
          />
          <ContactList 
            contacts={this.state.persons.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))}
          />
      </div>
    )
  }
}

export default App
