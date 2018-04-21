import React from 'react';

const Contact = ({contact}) => {
  return (
    <tr>
    <td>{contact.name}</td>
    <td>{contact.number}</td>
    </tr>
  )
}

const Contacts = ({contacts}) => {
  return (
    <table>
      <tbody>
        {contacts.map(item => <Contact key={item.name} contact={item} />)}
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: 1234567 }
      ],
      newName: '',
      newNumber: ''
    }
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
  
      const persons = this.state.persons.concat(contact)
  
      this.setState({
        persons,
        newName:''
      })
    }
  }

  handleNameChange = (event) => {
    console.log(event.target.value);
    this.setState({ newName: event.target.value })    
  }

  handleNumberChange = (event) => {
    console.log(event.target.value);
    this.setState({ newNumber: event.target.value })    
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addContact}>
          <div>
            nimi: <input
             value={this.state.newName}
             onChange={this.handleNameChange}
             />
          </div>
          <div>
            numero: <input
             value={this.state.newNumber}
             onChange={this.handleNumberChange}
             />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <Contacts contacts={this.state.persons} />
      </div>
    )
  }
}

export default App
