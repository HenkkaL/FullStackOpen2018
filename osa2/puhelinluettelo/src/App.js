import React from 'react';
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import contactService from './services/contacts'

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

  componentDidMount() {
    contactService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  addContact = (event) => {
    event.preventDefault()
    const exists = this.state.persons.filter(item => item.name === this.state.newName)
    console.log(exists);
    
    if (exists.length > 0) {
      if (window.confirm(`${exists[0].name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        exists[0].number = this.state.newNumber
        contactService
        .update(exists[0])
        .then(responce => {
          this.setState({
            persons: this.state.persons.map(item => item.id !== responce.id ? item : responce)
          })
        })
      }
    } else {
      const contact = {
        name: this.state.newName,
        number: this.state.newNumber
      }   
  
      contactService
      .create(contact)
      .then(responce => {
        this.setState({
          persons: this.state.persons.concat(responce),
          newName:'',
          newNumber: ''
        })
      })     
    }
  }

  deleteItem = (id) => {
    return () => {
      if (window.confirm("haluatko poistaa numeron"))
        contactService
          .deleteContact(id)
          .then(responce => {
            if (responce.status === 200) {
              this.setState({
                persons: this.state.persons.filter(item => item.id !== id)
              })
            }
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
            deleteItem={this.deleteItem}
          />
      </div>
    )
  }
}

export default App
