

import React, { useState } from 'react';
import { Button, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../../components/dashboard/StudentsCard';
function Home() {
  return (
    
    <Row>
   

    
    <Col sm="6" lg="4">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Present"
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>
    <Col sm="6" lg="4">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Present"
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col> <Col sm="6" lg="4">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Present"
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col> <Col sm="6" lg="4">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Present"
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>


    

    
    
  </Row>

  );
}

export default Home;
