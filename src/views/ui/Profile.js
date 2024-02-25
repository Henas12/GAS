
import React from 'react';
import { Form, Col, Row,CardBody,Card, CardTitle,Alert,Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Apps from '../../views/ui/Apps'
import { resetStudent } from "../../slices/studentSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Feeds from '../../components/dashboard/Feeds';

const Profile = () => {
  

    const [formData, setFormData] = useState({
        username : '',
        email: '',
        gender:'',
       date_of_birth:"",
        first_name : '',
        last_name : '',
        phone_number : '',
        address : '',
    
      });

      const handleGuadianInputChange = ()=>{
console.log('hena')
      }

      
      const Updata = ()=>{
        console.log('hena')
              }

  return(

         
            <>


<Row>


 <Col sm="6" lg="6" xl="7" xxl="8">

 <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
Information
        </CardTitle>
     
        <CardBody className="">

              <Form >


          <Row>
   
            <Col>
            <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.first_name && <Alert variant="danger">{formErrors.first_name}</Alert>} */}
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.last_name && <Alert variant="danger">{formErrors.last_name}</Alert>} */}
            </Form.Group>
            </Col>
            </Row>
            <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.username && <Alert variant="danger">{formErrors.username}</Alert>} */}
            </Form.Group>            
            <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" name="gender" value={formData.gender} onChange={handleGuadianInputChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </Form.Control>
            {/* {formErrors.gender && <Alert variant="danger">{formErrors.gender}</Alert>} */}
            </Form.Group>
            
            <Form.Group controlId="formBirthDate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.birthDate && <Alert variant="danger">{formErrors.birthDate}</Alert>} */}
            </Form.Group>
           
            <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
            type="number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.phone_number && <Alert variant="danger">{formErrors.phone_number}</Alert>} */}
            </Form.Group>
            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleGuadianInputChange}
            />
            {/* {formErrors.address && <Alert variant="danger">{formErrors.address}</Alert>} */}
            </Form.Group>
            <Button variant="primary" onClick={Updata}>
    Update Information
     </Button>
   
   
    
  </Form>
  </CardBody >

  </Card>
  </Col>

  <Col sm="6" lg="6" xl="5" xxl="4">      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          Reports and Announcemet
        </CardTitle>
        <CardBody className="">
        <Feeds />
        </CardBody>
      </Card>
    </Col>
  </Row>

  </>
  )
};

export default Profile;
