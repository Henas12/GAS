import React,{useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Loader from '../../layouts/loader/Loader';
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

  import { Modal } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import { useAllGuardiansQuery,useDeleteGuardianMutation } from '../../slices/guardiansApiSlice';
function Guardians() {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [id, setId] =  useState()

const {data, isLoading, error, refetch} = useAllGuardiansQuery()
const [deleteGuardian, {isLoading:isDeleteLoaing}] = useDeleteGuardianMutation()

const handleShowConfirmation = (guardianId) => {
    setId(guardianId)
    console.log(id)
    setShowConfirmation(true);
  };

  const handleConfirmAction = async() => {
    try{
      const res = await deleteGuardian( id)
      console.log(res)
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
   isLoading?<Loader/>
:   ( <Row>
     
    <Col lg="12">
    <div>
    <Card>
    <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          Guardians List
        </CardTitle>
      <CardBody>

    <Table className="no-wrap mt-3 align-middle" responsive borderless>
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Phone Number</th>

        <th>Detail</th>
     
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>

      
      {data.map((guardian) => (
        <tr key={guardian.id} className="border-top">
          <td>
            <div className="d-flex align-items-center p-2">
              <img
              
              src={guardian.user_photo_1}
                className="rounded-circle"
                alt="avatar"
                width="45"
                height="45"
              />
              <div className="ms-3">
                <h6 className="mb-0">{guardian.first_name} {guardian.last_name}</h6>
                <span className="text-muted">@{guardian.username}</span>
              </div>
            </div>
          </td>
          <td>{guardian.phone_number}</td>
             
          <td><Button onClick={()=> navigate(`/guardians/${guardian.id}`)} className="btn" color="info">
     More
    </Button></td>
    <td><Button onClick={()=> handleShowConfirmation(guardian.id)} className="btn-danger" >
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

  )
}

export default Guardians