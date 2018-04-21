import React from 'react';

const Contact = ({contact}) => {
  return (
    <li>{contact.name}</li>
  )
}

const Contacts = ({contacts}) => {
  return (
    <ul>
      {contacts.map(item => <Contact key={item.name} contact={item} />)}
    </ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
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
        name: this.state.newName
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
