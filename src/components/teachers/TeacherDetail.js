import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card,Dropdown, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import StudentList from './StudentsList';
import { useNavigate } from 'react-router-dom';
import './UserInfoDisplay.css';
import { useGradeQuery } from '../../slices/studentApiSlice';
import { useGetSingleTeacherQuery } from '../../slices/teacherApiSlice';
import { useAssignSectionMutation,useActivateTeacherMutation } from '../../slices/teacherApiSlice';
function TeacherDetail() {
const { id: guardianId } = useParams();

const {data:sections ,isLoading:isSectionLoading, error:logError} = useGradeQuery()

const [assignSections, {isLoading:isassignSection}] = useAssignSectionMutation()
const [activateTeacher, {isLoading:isActivateTeacher}] = useActivateTeacherMutation()


const {data, isLoading, error, refetch} = useGetSingleTeacherQuery(guardianId)
const [userStatus, setUserStatus] = useState()

const navigate = useNavigate()
useEffect(()=>{
  if (!isLoading){
 setUserStatus(data.user.is_active ? true : false);

  }
 


},[isLoading,isSectionLoading])

const handleStatusChange = async(status) => {
  try{
    const res = await activateTeacher(
      {hrt_id:data.user.id}
     )
     toast.success(res.data.detail)
    refetch()
   }
   catch(error){
     toast.error(error?.data)
   }
 


};


const assignSection = async(id) => {
  let data = {hrt_id:guardianId, grade_id:id}
  

  try{
    const res = await assignSections(data)
    toast.success(res.data.detail)

    console.log(res)
    refetch()
   }
   catch(error){
     toast.error(error?.data)
   }
  // You can add logic here to update the user status in the backend
};

     

  return (

   
   

    (isLoading||isSectionLoading
      ? <Loader/>:
    ( 
      <div style={{ display: 'flex', justifyContent: 'center' }}>
 <Card style={{ width: '80%' }}   className="p-5">
   
   
        <CardTitle tag="h2" className="border-bottom p-3 mb-0">
          Teacher  Info
        </CardTitle>

       <Row>  
<Col>
<Card.Body>
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="user-info">
          <div className="user-info-item">
            <span className="info-label">First Name:</span>
            <span className="info-value">{data.user.first_name}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Last Name:</span>
            <span className="info-value">{data.user.last_name}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Username:</span>
            <span className="info-value">{data.user.username}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{data.user.email}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Phone Number:</span>
            <span className="info-value">{data.user.phone_number}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Gender:</span>
            <span className="info-value">{data.user.gender}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Date of Birth:</span>
            <span className="info-value">{data.user.date_of_birth}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Status:</span>
            {!data.user.is_active?  (
            <>
            <span className={`info-value ${userStatus}`}>Inactive</span>
           
              <Button variant="success" onClick={() => handleStatusChange(true)}>
                Activate
              </Button>
              </>
            ): (
              <>
              <span className={`info-value ${userStatus}`}>Active</span>

            
            <Button variant="success" onClick={() => handleStatusChange(false)}>
            Deactivate
          </Button>
          </>) }
          </div>
         
        </div>
        <div className="button-container">
          <Button onClick={() => navigate(`/teachers`)} variant="primary">
            Go Back
          </Button>
        </div>
      </div>
    </Card.Body>
</Col>

<Col>


<div className="user-info-item">
  <h2 className='p-3'>Assign Grade and Section</h2>
  <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdown-basic">
      Select Action
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {sections.map((section) => (
        <Dropdown.Item key={section.id} onClick={() => assignSection(section.id)}>
          {section.grade}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</div>

</Col>
       </Row>
    
       
          
    
   
    
    

        
    

      </Card>
      </div>
      
      )
      
           )
    
    

  )
}

export default TeacherDetail