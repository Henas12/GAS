import React, {useState, useEffect} from 'react'

import { useParams } from 'react-router-dom';
import {Alert, CardTitle,Col, Button, Row, Image,Container, Card,Dropdown, Form } from 'react-bootstrap';
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
import { useNavigate } from 'react-router-dom';
import './UserInfoDisplay.css';
import { useGetSingleAuthenticatorQuery } from '../../slices/authenticatorApiSlice copy';
function AuthenticatorDetail() {
const { id: guardianId } = useParams();



const {data, isLoading, error, refetch} = useGetSingleAuthenticatorQuery(guardianId)
// const [userStatus, setUserStatus] = useState()
const navigate = useNavigate()

// useEffect(()=>{
//   if (!isLoading){
//  setUserStatus(data.user.is_active ? 'Active' : 'Inactive');

//   }
 
   
     


// },[isLoading])

// const handleStatusChange = (status) => {
//   setUserStatus(status);
//   // You can add logic here to update the user status in the backend
// };

     

  return (

   
   

    (isLoading? <Loader/>:
    ( 
      <div style={{ display: 'flex', justifyContent: 'center' }}>
 <Card style={{ width: '80%' }}   className="p-5">
   
   
        <CardTitle tag="h2" className="border-bottom p-3 mb-0">
          Authenticator  Info
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
          {/* <div className="user-info-item">
            <span className="info-label">Status:</span>
            <span className={`info-value ${userStatus}`}>{userStatus}</span>
            {!data.user.is_active && (
              <Button variant="success" onClick={() => handleStatusChange('Active')}>
                Activate
              </Button>
            )}
          </div> */}
         
        </div>
        <div className="button-container">
          <Button onClick={() => navigate(`/teachers`)} variant="primary">
            Go Back
          </Button>
        </div>
      </div>
    </Card.Body>
</Col>


       </Row>
    
       
          
    
   
    
    

        
    

      </Card>
      </div>
      
      )
      
           )
    
    

  )
}

export default AuthenticatorDetail