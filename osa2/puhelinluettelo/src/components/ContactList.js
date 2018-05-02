import React from 'react';

const Contact = ({contact, deleteItem}) => {
    return (
      <tr>
      <td>{contact.name}</td>
      <td>{contact.number}</td>
      <td><button onClick={deleteItem}>Poista</button></td>
      </tr>
    )
  }
  
  const Contacts = ({contacts, deleteItem}) => {
    return (
      <table>
        <tbody>
          {contacts.map(item => <Contact key={item.name} contact={item} deleteItem={deleteItem(item.id)} />)}
        </tbody>
      </table>
    )
  }

const ContactList = ({contacts, deleteItem}) => {
    return (
        <div>
            <h2>Numerot</h2>
            <Contacts contacts={contacts} deleteItem={deleteItem}/>
        </div>
    );
};

export default ContactList;