
import React from 'react';
import { Form, Col, Row,CardBody,Card, CardTitle,Alert,Button } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Apps from '../../views/ui/Apps'
import { resetStudent } from "../../slices/studentSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
  
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

  const newLocal = <option value="Need Improvement">Need Improvement</option>;
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


          <Row className="mb-3">
   
            <Col>
            <Form.Group controlId="parentFollowUp">
            <Form.Label style={{ fontWeight: 'bold' }}>Parent Follow Up</Form.Label>
            <Form.Control  required as="select" name="parentFollowUp"  onChange={handleGuadianInputChange}>
            <option value="">Select Level</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            </Form.Control>
            </Form.Group>
            
            </Col>
            <Col>
            <Form.Group controlId="handWriting">
            <Form.Label style={{ fontWeight: 'bold' }}> Hand Writing</Form.Label>
            <Form.Control  required as="select" name="handWriting"  onChange={handleGuadianInputChange}>
            <option value="">Select Level</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>

            <option value="Need Improvement">Need Improvement</option>

            

            </Form.Control>
            </Form.Group>
            
            </Col>
            </Row>
            <Row className="mb-3">
   
   <Col>
   <Form.Group controlId="readingSkill">
   <Form.Label style={{ fontWeight: 'bold' }}>Reading Skill</Form.Label>
   <Form.Control  required as="select" name="readingSkill"  onChange={handleGuadianInputChange}>
   <option value="">Select Level</option>
   <option value="Very Good">Very Good</option>
   <option value="Good">Good</option>
   <option value="Fair">Fair</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   <Col>
   <Form.Group controlId="materialHandling">
   <Form.Label style={{ fontWeight: 'bold' }}> Material Handling</Form.Label>
   <Form.Control  required as="select" name="materialHandling"  onChange={handleGuadianInputChange}>
   <option value="">Select Level</option>
   <option value="Very Good">Very Good</option>
   <option value="Good">Good</option>
   <option value="Fair">Fair</option>

   <option value="Need Improvement">Need Improvement</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   </Row>
   <Row className="mb-3">
   
   <Col>
   <Form.Group controlId="happy">
   <Form.Label style={{ fontWeight: 'bold' }}>Happy</Form.Label>
   <Form.Control  required as="select" name="happy"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   
   <Col>
   <Form.Group controlId="wearUniform">
   <Form.Label style={{ fontWeight: 'bold' }}>Wear Uniform</Form.Label>
   <Form.Control  required as="select" name="wearUniform"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   
   </Col>
   </Row>
   <Row className="mb-3">
   
   <Col>
   <Form.Group controlId="HasGoodTimeWhileEating">
   <Form.Label style={{ fontWeight: 'bold' }}>Has Good time While Eating</Form.Label>
   <Form.Control  required as="select" name="HasGoodTimeWhileEating"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   
   <Col>
   <Form.Group controlId="activeParticipation">
   <Form.Label style={{ fontWeight: 'bold' }}>Active Participation</Form.Label>
   <Form.Control  required as="select" name="activeParticipation"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   
   </Col>
   </Row>


   <Form.Group controlId="teacherComment" className="mb-3">
      <Form.Label style={{fontWeight:'bold'}}>Teacher Comment</Form.Label>
      <Form.Control as="textarea"  name='teacherComment' required rows={3} />
    </Form.Group>


           

           
            
           
           
            <Button variant="primary" onClick={Updata}>
    Submit Informaion
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
        {/* <Feeds /> */}
        </CardBody>
      </Card>
    </Col>
  </Row>

  </>
  )
};

export default ContactForm;
