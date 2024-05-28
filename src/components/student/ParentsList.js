import React,{useState, useEffect} from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";
import Feeds from '../dashboard/Feeds';
import { BASE_URL } from '../../constants';
import { useLogsQuery } from '../../slices/studentApiSlice';
import {  Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetParentsQuery, useRemoveParentMutation } from '../../slices/ParentApiSlice';
import user1 from "../../assets/images/users/user1.jpg";
import Loader from '../../layouts/loader/Loader';
import {toast} from 'react-toastify'
import { useGetSingleStudentQuery } from '../../slices/studentApiSlice';




function ParentList() {
  const { id: studentId } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] =  useState()
  const[reomveGuardian, {isLoading:reomveGuardianIsLoading}] =useRemoveParentMutation()

  const {data, isLoading, error, refetch} = useGetParentsQuery(studentId)

  const handleShowConfirmation = (guardianId) => {
    setId(guardianId)
    setShowConfirmation(true);
  };

  const handleConfirmAction = async() => {
    try{
      const res = await reomveGuardian({studentId, id})
      toast.success('Guardian is Removed')

      refetch()
     }
     catch(error){
       toast.error(error?.data)
     }
    setShowConfirmation(false);
  };
  
  const handleCancelAction = () => {
    
    setShowConfirmation(false);
  };
  
const navigate = useNavigate()



  return (

 
  <Row>
          
          
{     isLoading? <Loader/>:
(  reomveGuardianIsLoading?<Loader/> :
(  <Col sm="6" lg="6" xl="7" xxl="8">

 {/* --------------------------------------------------------------------------------*/}
 {/* Card-1*/}
 {/* --------------------------------------------------------------------------------*/}
 <Card>
   <CardTitle tag="h3" className="border-bottom p-3 mb-0">
     Parent List
   </CardTitle>
   <CardBody className="">

  <Table className="no-wrap mt-3 align-middle" responsive borderless>
       <thead>
         <tr>
           <th>Full Name</th>
           <th>Relation</th>

           <th>Detail</th>
        
           <th>Remove</th>
         </tr>
       </thead>
       <tbody>

         
         {data.map((guardian) => (
           <tr key={guardian.user.id} className="border-top">
             <td>
               <div className="d-flex align-items-center p-2">
                 <img
                 // src={`http://10.42.0.61:8000${guardian.user?.user_photo}`}
                 
                 src={`${BASE_URL}${guardian.user?.user_photo_1}`}
                   className="rounded-circle"
                   alt="avatar"
                   width="45"
                   height="45"
                 />
          
                 <div className="ms-3">
                   <h6 className="mb-0">{guardian.user.first_name} {guardian.user.last_name}</h6>
                   <span className="text-muted">{guardian.user.username}</span>
                 </div>
               </div>
             </td>
             <td>{guardian.relationship}</td>
                
             <td><Button onClick={()=> navigate(`/parents/${guardian.user.id}`)} className="btn" color="info">
        More
       </Button></td>
       <td><Button onClick={()=> handleShowConfirmation(guardian.user.id)} className="btn-danger" >
        Remove
       </Button></td>


           </tr>
         ))}
       </tbody>
     </Table>       
      
   <div className="d-grid mt-3">
 <Button className="btn" color="primary"  block onClick={()=>navigate(`/${studentId}/parent-assign`)} >
            Assign New Parent
           </Button> 
           </div>
           </CardBody>
 </Card>
</Col>


)

)}



<Col sm="6" lg="6" xl="5" xxl="4">      {/* --------------------------------------------------------------------------------*/}
 {/* Card-2*/}
 {/* --------------------------------------------------------------------------------*/}
 <Card>
   <CardTitle tag="h3" className="border-bottom p-3 mb-0">
     Recent Activities
   </CardTitle>
   <CardBody className="">
   {/* <Feeds /> */}
   </CardBody>
 </Card>
</Col>


<Modal show={showConfirmation} onHide={handleCancelAction}>
   <Modal.Header closeButton>
     <Modal.Title>Confirmation</Modal.Title>
   </Modal.Header>
   <Modal.Body>
     Are you sure you want to perform this action?
   </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleCancelAction}>
       Cancel
     </Button>
     <Button className="btn-danger" onClick={handleConfirmAction}>
       Confirm
     </Button>
   </Modal.Footer>
 </Modal> 
</Row>

  )
}

export default ParentList



  
