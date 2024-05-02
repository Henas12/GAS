import React, { useState } from 'react';

function ContactTable({ contacts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-3"
      />
      <table className="table table-bordered table-hover table-striped p-3">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Grade</th>
            <th scope="col">Actions</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.grade}</td>
              <td><button className="btn btn-primary">Action</button></td>
              <td><img src={contact.image} alt={`Image of ${contact.firstName}`} style={{ width: '50px', height: '50px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const contacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    grade: 'A',
    image: 'https://via.placeholder.com/150',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    grade: 'B',
    image: 'https://via.placeholder.com/150',
  },
  // Add more contact objects here
];

function Search() {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Contact Table</h1>
      <ContactTable contacts={contacts} />
    </div>
  );
}

export default Search;
