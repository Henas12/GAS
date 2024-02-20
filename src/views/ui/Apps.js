import React, { useState, useEffect } from 'react';
import {useParams,  BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import ResultsComponent from './ResultsComponent';
import { Card, Button, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useGetGuardianQuery } from '../../slices/registrationApiSlice';
import Loader from '../../layouts/loader/Loader';
import { useGuardianFromExistingMutation } from '../../slices/registrationApiSlice';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

const Apps = ({setRefetch, refetchs}) => {
  // const initialData = [
  //   { id: 1, username: 'Apple' },
  //   { id: 2, username: 'Banana' },
  //   { id: 3, username: 'Orange' },
  //   { id: 4, username: 'Mango' },
  //   { id: 5, username: 'Mango' },

  //   { id: 6, username: 'Mango' },
  //   { id: 8, username: 'Mango' },
  //   { id: 9, username: 'Mango' },
  //   { id: 10, username: 'Mango' },
  //   { id: 11, username: 'Mango' },
  //   { id: 12, username: 'Mango' },
    
  // ];

  const [guardians, {isLoading: guardianLoading} ] = useGuardianFromExistingMutation()

  // const { studentInfo } = useSelector((state) => state.student);
  // let studentId = studentInfo.id
  const {id: studentId} = useParams();
  const { data:initialData, isLoading, error,refetch } = useGetGuardianQuery(studentId);
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
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const handleItemClick = async(item) => {
    try{
    const data = {'guardian_id':item.id}
    console.log(studentId)
    const res = await guardians({studentId,data}).unwrap()
    toast.success('Guardian is Added')
    refetch();
    setRefetch(true)
    console.log(refetchs)
    console.log(selectedItem)
 
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
