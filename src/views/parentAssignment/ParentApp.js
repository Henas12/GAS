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

const Apps = ({setRefetch, refetchs}) => {
 

  const navigate  = useNavigate()
  
  
  const [guardians, {isLoading: guardianLoading} ] = useParentFromExistingMutation()

  // const { studentInfo } = useSelector((state) => state.student);
  // let studentId = studentInfo.id
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
    try{
      if(item.user.is_active=== true)
      {

      
    const data = {'parent_id':item.user.id}
    console.log(studentId)
    const res = await guardians({studentId,data}).unwrap()
    toast.success('Parent is Added')
    navigate(`/${studentId}/guardian_registration`)
    refetch();
    setRefetch(true)
    

  }

  else{


    toast.error('Parent is Added')

  }
 
  }
    catch(err) {
      toast.error(err?.data?.message || err.error);
  }};

   

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
        </div>
      )
    );
    
    

 
      

};

export default Apps;
