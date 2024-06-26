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
import { useAllAuthenticatorsQuery,useDeleteAuthenticatorMutation } from '../../slices/authenticatorApiSlice copy';
import Guardians from './Guardians';


  function Authenticators() {

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [id, setId] =  useState()

const {data, isLoading, error, refetch} = useAllAuthenticatorsQuery()
const [deleteGuardian, {isLoading:isDeleteLoaing}] = useDeleteAuthenticatorMutation()

const handleShowConfirmation = (guardianId) => {
    setId(guardianId)
    setShowConfirmation(true);
  };

  const handleConfirmAction = async() => {
    try{
      const res = await deleteGuardian(id)
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
         Authenticator List
        </CardTitle>
      <CardBody>

    <Table className="no-wrap mt-3 align-middle" responsive borderless>
    <thead>
      <tr>
        <th>Full Name</th>
        <th>Phone Number</th>

        <th>Detail</th>
     
        <th>Status</th>
        <th>Remove</th>
     
      </tr>
    </thead>
    <tbody>

      
      {data.map((guardian) => (
        <tr key={guardian.user.id} className="border-top">
          <td>
            <div className="d-flex align-items-center p-2">
              <img
              
              src={guardian.user_photo_3}
                className="rounded-circle"
                alt="avatar"
                width="45"
                height="45"
              />
              <div className="ms-3">
                <h6 className="mb-0">{guardian.user.first_name} {guardian.user.last_name}</h6>
                <span className="text-muted">@{guardian.user.username}</span>
              </div>
            </div>
          </td>
          <td>{guardian.user.phone_number}</td>
             
          <td><Button onClick={()=> navigate(`/authenticators/${guardian.user.id}`)} className="btn" color="info">
     More
    </Button></td>
    <td>

    {guardian.user.is_active  ? (<span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>):
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    }


    </td>
    <td><Button onClick={()=> handleShowConfirmation(guardian.user.id)} className="btn-danger" >
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

export default Authenticators