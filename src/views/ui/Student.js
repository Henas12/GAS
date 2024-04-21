// MultiStepForm.js
import React, { useState, useRef } from 'react';

import StudentDetail from '../../components/student/StudentDetail';

import { toast } from 'react-toastify';
import { Row, Container, Card, Form } from 'react-bootstrap';
import GuardiansList from '../../components/student/GuardiansList';
import ParentList from '../../components/student/ParentsList';

const Student = () => {
 


  return (
    





    <div>
      <Container>
    <Row>
       <StudentDetail/>
       <ParentList/>
       <GuardiansList/>
</Row>
</Container>
    </div>
  );
}

  
  
  


export default Student;

