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

const ContactList = ({contacts}) => {
    return (
        <div>
            <h2>Numerot</h2>
            <Contacts contacts={contacts} />
        </div>
    );
};

export default ContactList;