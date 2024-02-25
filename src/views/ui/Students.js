
import { Card,  CardBody, CardTitle, CardSubtitle, Table,Col, Row,Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "../../slices/studentApiSlice";
import { UseDispatch, useSelector } from "react-redux";
import { setStudent } from "../../slices/studentSlice";
import Loader from "../../layouts/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDeleteSudentMutation } from "../../slices/studentApiSlice";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
import {  Modal } from 'react-bootstrap';




const Students = () => {
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [id, setId] =  useState()
  const {data, isLoading, error, refetch} = useGetStudentsQuery()
const [deleteStudent, {isLoading:deletIsloading}] = useDeleteSudentMutation()
 
const handleShowConfirmation = (studentId) => {
  setId(studentId)
  setShowConfirmation(true);
};
const handleConfirmAction = async() => {
  try{
    const res = await deleteStudent(id)
    console.log(res)
    refetch()
    toast.success('Student is Deleted')
   }
   catch(error){
     toast.error(error?.data)
   }
  setShowConfirmation(false);
};

const handleCancelAction = () => {
  
  setShowConfirmation(false);
};



  return (


isLoading? (<Loader/>) : (
  <Row>
     
  <Col lg="12">
  <div>
  <Card>
    <CardBody>
      
      <CardSubtitle className="mb-2 text-muted" tag="h3">
        All Students
      </CardSubtitle>

      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th>Student Profile</th>
            <th>Grade</th>

            <th>Detail</th>
            <th>Dismiss</th>
            
            
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id} className="border-top">
              <td>
                <div className="d-flex align-items-center p-2">
                  
                  
                  <img
                    src={student.image}
                    className="rounded-circle"
                    alt="avatar"
                    width="45"
                    height="45"
                  />
              
                  <div className="ms-3">
                    <h6 className="mb-0">{student.first_name} {student.last_name}</h6>
                    
                  </div>
                  
                </div>
              </td>
              <td>{student.grade}</td>
              
              
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
  </Card>
</div>
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

   
  );
};

export default Students;
