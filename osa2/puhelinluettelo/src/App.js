import React from 'react';
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import contactService from './services/contacts'
import SuccessAlert from './components/SuccessAlert'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      success: null
    }
  }

  componentDidMount() {
    contactService
      .getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  alertSuccess = (message) => {
    this.setState({success: message})
    setTimeout(() => {
      this.setState({success: null})
    }, 5000)
  }

  addContact = (event) => {
    event.preventDefault()
    const exists = this.state.persons.find(item => item.name === this.state.newName)
    
    if (exists) {
      if (window.confirm(`${exists.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const update = { ...exists, number: this.state.newNumber }
        contactService
        .update(update)
        .then(responce => {
          this.setState({
            persons: this.state.persons.map(item => item.id !== responce.id ? item : responce)
          })      
          this.alertSuccess(`Päivitettiin ${update.name} tietoja`)    
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
        this.alertSuccess(`Lisättiin ${responce.name}`) 
      })     
    }
  }

  deleteItem = (contact) => {    
    return () => {
      console.log(contact)
      if (window.confirm("haluatko poistaa numeron"))
        contactService
          .deleteContact(contact.id)
          .then(responce => {
            if (responce.status === 200) {
              this.setState({
                persons: this.state.persons.filter(item => item.id !== contact.id)
              })
              this.alertSuccess(`Poistettiin ${contact.name}`) 
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
          <SuccessAlert
            message={this.state.success}
          />
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
