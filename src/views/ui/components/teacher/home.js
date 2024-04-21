

import React, { useState, useEffect } from 'react';
import { Button, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../../components/dashboard/StudentsCard';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { toast } from 'react-toastify';
function Home() {

  const [isLoading, setIsLoading] = useState(true);
  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})

  useEffect(()=>{

    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/hrts/take_attendance/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + String(authTokens.access),
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDatas(data);
        console.log(data)
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        toast.error('Error fetching data:', error);
        // Handle error here
        setIsLoading(false); // Set loading state to false if an error occurs
      }
    }
    
    fetchData();



  
  },[])



  return (
    
    <Row>

   
   {isLoading ? 
   (
  <Loader/>
):
(
  datas.map((data) => (
    <Col sm="6" lg="4" key={data.id}>
      <TopCards
        bg="bg-light-success text-success"
        title={data.first_name}
        subtitle="Present"
        earning={`${data.first_name} ${data.last_name}`}
        icon="bi bi-people-fill"
      />
    </Col>
  ))
) 
}



 


   
  </Row>

  );
}

export default Home;
