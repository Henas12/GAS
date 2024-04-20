import React, { useState, useEffect } from 'react';
import {useParams,  BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import { Card, Button, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useGetGuardianQuery } from '../../slices/registrationApiSlice';
import Loader from '../../layouts/loader/Loader';
import { useParentFromExistingMutation, useAssignParentQuery } from '../../slices/registrationApiSlice';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  Modal } from 'react-bootstrap';

const Apps = ({setNewGuardian,setRefetch, refetchs, setParentId}) => {
 

  const navigate  = useNavigate()
  
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [guardians, {isLoading: guardianLoading} ] = useParentFromExistingMutation()

 
  const {id: studentId} = useParams();
  const { data:initialData, isLoading, error,refetch } = useAssignParentQuery(studentId);
  const [filteredData, setFilteredData] = useState([]);



  


  useEffect(() => {
    if (initialData) {
     
      setFilteredData(initialData);
    
    }
  }, [initialData,isLoading]);
 
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = (searchTerm) => {
    console.log(searchTerm)
    const filteredResults = initialData.filter((item) =>
      item.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleItemClick = async(item) => {
    setParentId(item.user.id)
    
    try{
      if(item.user.is_active=== true)
      {

      
    const data = {'parent_id':item.user.id}

    console.log(studentId)
    const res = await guardians({studentId,data}).unwrap()
    toast.success('Parent is Added')
 
    refetch();
    setRefetch(true)
    

  }

  else{
  


    setShowConfirmation(true)


  }
 
  }

    catch(err) {
      toast.error(err?.data?.message || err.error);
  }};

  const handleCancelAction =()=>{
    
    setShowConfirmation(false)
  }
  const handleConfirmAction =()=>{
 
    setNewGuardian(true)
    setShowConfirmation(false)
  }
   

    return (
      isLoading||guardianLoading ? (
        <Loader/>
      ) : (
        <div>
          <Card>
          <SearchComponent data={initialData} onSearch={handleSearch} />
          <Link >
            <ResultsComponent results={filteredData} onItemClick={handleItemClick} />
          </Link>
          </Card>


          <Modal show={showConfirmation} onHide={handleCancelAction}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The Provided parent is not actived, Press "Activate" to Activate?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelAction}>
            Cancel
          </Button>
          <Button className="btn-danger" onClick={handleConfirmAction}>
           Activate
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      )
    );
    
    

 
      

};

export default Apps;
