
import React from 'react';
import { Form, Col, Row,CardBody,Card, CardTitle,Alert,Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import { useContext } from 'react';
const ContactForm = () => {

  const [isLoading1, setIsLoading1] = useState(true);

  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})

  
  const { id: studentId } = useParams();
  async function sendContactBook() {
    try {
      const response = await fetch(`${BASE_URL}/students/${studentId}/contactbooks/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },
       

          body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
    
      setIsLoading1(false); // Set loading state to false after data is fetched
    } catch (error) {
      toast.error('Error fetching data:', error);
      
      setIsLoading1(false); // Set loading state to false if an error occurs
    }
  }


    const [formData, setFormData] = useState({
       
    
      });

      const handleGuadianInputChange = (event)=>{
const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });   
     }

      
      const update = (event)=>{
        
        event.preventDefault();
        console.log(formData)
        sendContactBook()
        console.log(formData)
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

              <Form  onSubmit={update}>


          <Row className="mb-3">
   
            <Col>
            <Form.Group controlId="parent_follow_up">
            <Form.Label style={{ fontWeight: 'bold' }}>Parent Follow Up</Form.Label>
            <Form.Control  required as="select" name="parent_follow_up"  onChange={handleGuadianInputChange}>
            <option value="">Select Level</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            </Form.Control>
            </Form.Group>
            
            </Col>
            <Col>
            <Form.Group controlId="hand_writing">
            <Form.Label style={{ fontWeight: 'bold' }}> Hand Writing</Form.Label>
            <Form.Control  required as="select" name="hand_writing"  onChange={handleGuadianInputChange}>
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
   <Form.Group controlId="reading_skill">
   <Form.Label style={{ fontWeight: 'bold' }}>Reading Skill</Form.Label>
   <Form.Control  required as="select" name="reading_skill"  onChange={handleGuadianInputChange}>
   <option value="">Select Level</option>
   <option value="Very Good">Very Good</option>
   <option value="Good">Good</option>
   <option value="Fair">Fair</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   <Col>
   <Form.Group controlId="material_handling">
   <Form.Label style={{ fontWeight: 'bold' }}> Material Handling</Form.Label>
   <Form.Control  required as="select" name="material_handling"  onChange={handleGuadianInputChange}>
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
   <Form.Group controlId="wear_uniform">
   <Form.Label style={{ fontWeight: 'bold' }}>Wear Uniform</Form.Label>
   <Form.Control  required as="select" name="wear_uniform"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   
   </Col>
   </Row>
   <Row className="mb-3">
   
   <Col>
   <Form.Group controlId="has_good_time_while_eating">
   <Form.Label style={{ fontWeight: 'bold' }}>Has Good time While Eating</Form.Label>
   <Form.Control  required as="select" name="has_good_time_while_eating"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   
   <Col>
   <Form.Group controlId="active_participation">
   <Form.Label style={{ fontWeight: 'bold' }}>Active Participation</Form.Label>
   <Form.Control  required as="select" name="active_participation"  onChange={handleGuadianInputChange}>
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   
   </Col>
   </Row>


   <Form.Group controlId="teacher_comment" className="mb-3">
      <Form.Label style={{fontWeight:'bold'}}>Teacher Comment</Form.Label>
      <Form.Control as="textarea"  name='teacher_comment' required rows={3}  onChange={handleGuadianInputChange} />
    </Form.Group>


           

           
            
           
           
            <Button variant="primary" type='submit' >
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
