
import React, { useState, useRef } from 'react';

import GuardianDetail from '../../components/parent/ParentDetail';
import StudentList from '../../components/guardian/StudentsList';
import { toast } from 'react-toastify';
import { Row, Container, Card, Form } from 'react-bootstrap';
import AuthenticatorDetail from '../../components/authenticator/AuthenticatorDetail';
const Authenticator = () => {
 


  return (
    





    <div>
      <Container>
    <Row>
       <AuthenticatorDetail/>
    
</Row>
</Container>
    </div>
  );
}

  
  
  


export default Authenticator;
