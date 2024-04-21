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

import {  Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import user1 from "../../assets/images/users/user1.jpg";
import Loader from '../../layouts/loader/Loader';
import {toast} from 'react-toastify'
import { useGetMyStudentsQuery, useRemoveStudentMutation } from '../../slices/guardiansApiSlice';





function StudentList() {
  const { id: guardianId } = useParams();
  const {data, isLoading, error, refetch} = useGetMyStudentsQuery(guardianId)

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] =  useState()
  const[removeStudent, {isLoading:removeStudentIsLoading}] =useRemoveStudentMutation()

  const handleShowConfirmation = (studentId) => {
    setId(studentId)
    setShowConfirmation(true);
  };

  const handleConfirmAction = async() => {
    try{
      const res = await removeStudent({guardianId, id})
      

      refetch()
      toast.success("Studetnt Is Removed")
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


useEffect(()=>{
  if(data){
  
    console.log(data)
    console.log("hena")
    refetch()
  }
  
  },[data])
  

  return (

 
  
  <Row>
          
          
     {     isLoading? <Loader/>:
 (  removeStudentIsLoading?<Loader/> :
 (  <>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          Students List
        </CardTitle>
        <CardBody className="">

        <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Full Name</th>
               

                <th>Detail</th>
             
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>

              
              {data.map((student) => (
                <tr key={student.id} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                      src={student?.image}  

                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />

                   
                      <div className="ms-3">
                        <h6 className="mb-0">{student.first_name} {student.last_name}</h6>
                        <span>{student.class_name}</span>
                      </div>
                    </div>
                  </td>
                  
                     
                  <td><Button onClick={()=> navigate(`/students/${student.id}`)} className="btn" color="info">
             More
            </Button></td>
            <td><Button onClick={()=> handleShowConfirmation(student.id)} className="btn-danger" >
             Remove
            </Button></td>


                </tr>
              ))}
            </tbody>
          </Table>       
   
                </CardBody>
                </>


    )
    
    )}

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

export default StudentList