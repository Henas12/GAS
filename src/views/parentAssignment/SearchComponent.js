// src/components/SearchComponent.js
import React, { useState } from 'react';
import { Form, Col, Row, Alert,Button } from 'react-bootstrap';

const SearchComponent = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div>

<Form.Group controlId="formStep3">
      <Form.Label>Search Guardians</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Form.Group>
    </div>
  );
};
export default SearchComponent;
