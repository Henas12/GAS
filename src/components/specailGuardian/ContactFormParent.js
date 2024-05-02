
import React, {useEffect}from 'react';
import { Form, Col, Row,CardBody,Card, CardTitle,Alert } from 'react-bootstrap';

import {
  Button,
 
} from "reactstrap";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import { useContext } from 'react';
import Loader from '../../layouts/loader/Loader';
const ContactFormParent = () => {
const navigate = useNavigate()
  const [refetch, setRefetch]= useState(true)

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);


  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})

  
  const { id: cbId } = useParams();
  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/contact_book/contact_book_hrt/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({'info_type':"cb",'cb_id':cbId})

   
       
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDatas(data);

      setIsLoading(false); 
    } catch (error) {
      toast.error('Error fetching data:', error);
    
      setIsLoading(false); 
    }
  }



  async function sendContactBook() {
    try {
      const response = await fetch(`${BASE_URL}/contact_book/contact_book_parent/`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },
       

          body:JSON.stringify (formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success('Information Filled Out');
      navigate('/parent/home')

    
      setIsLoading1(false); // Set loading state to false after data is fetched
    } catch (error) {
      console.log(error)
      toast.error('Error fetching data:', error);
      
      setIsLoading1(false); // Set loading state to false if an error occurs
    }
  }


 

  useEffect(()=>{

    
      
    
    fetchData();
    

    

  
  },[])


  const [formData, setFormData] = useState({

    
  cb_id:cbId,
    p_comment: "",
  
  
    });

    const handleGuadianInputChange = (event)=>{
const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });   
   }


   const update = (event)=>{
        
    event.preventDefault();
    console.log(formData)
    sendContactBook()
          }

   return(        
            <>
<Row>


 <Col sm="6" lg="8" xl="7" xxl="8">

 <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
Information
        </CardTitle>
     
        <CardBody className="">

          

     { isLoading ? <Loader/> :      
    <Form  onSubmit={update} >


          <Row className="mb-3">
   
            <Col>
            <Form.Group controlId="parents_follow_up">
            <Form.Label style={{ fontWeight: 'bold' }}>Parent Follow Up</Form.Label>
            <Form.Control  required as="select" name="parents_follow_up" disabled value={datas.parents_follow_up} >
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
            <Form.Control  required as="select" name="hand_writing"  disabled value={datas.hand_writing} >
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
   <Form.Control  required as="select" name="reading_skill"  disabled value={datas.reading_skill} >
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
   <Form.Control  required as="select" name="material_handling"  disabled value={datas.material_handling} >
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
   <Form.Control  required as="select" name="happy"  disabled value={datas.happy} >
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   
   <Col>
   <Form.Group controlId="wear_uniform">
   <Form.Label style={{ fontWeight: 'bold' }}>Wear Uniform</Form.Label>
   <Form.Control  required as="select" name="wear_uniform"  disabled value={datas.wear_uniform}>
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
   <Form.Control  required as="select" name="has_good_time_while_eating" disabled value={datas.has_good_time_while_eating} >
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   </Col>
   
   <Col>
   <Form.Group controlId="active_participation">
   <Form.Label style={{ fontWeight: 'bold' }}>Active Participation</Form.Label>
   <Form.Control  required as="select" name="active_participation" disabled value={datas.active_participation} >
   <option value="">Select One</option>
   <option value="Yes">Yes</option>
   <option value="No">No</option>
   </Form.Control>
   </Form.Group>
   
   
   </Col>
   </Row>


   <Form.Group controlId="teacher_comment" className="mb-3">
      <Form.Label style={{fontWeight:'bold'}}>Teacher Comment</Form.Label>
      <Form.Control as="textarea"  name='teacher_comment' required rows={3}  disabled value={datas.teacher_comment}  />
    </Form.Group>

    <Form.Group controlId="teacher_comment" className="mb-3">
      <Form.Label style={{fontWeight:'bold'}}>Parent Comment</Form.Label>
      <Form.Control as="textarea"  name='parent_comment' required rows={3}    onChange={handleGuadianInputChange}  />
    </Form.Group>
           

           
            
           
      
    <Button  color='primary'  type='submit' >
    Submit Informaion
     </Button>
       
   
    
  </Form>
  

 
  }
  </CardBody >

  </Card>
  </Col>

 
  </Row>

  </>
  )
};

export default ContactFormParent;
