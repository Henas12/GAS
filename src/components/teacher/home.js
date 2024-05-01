

import React, { useState, useEffect } from 'react';
import { Button,Card, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../../components/dashboard/StudentsCard';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { toast } from 'react-toastify';
function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);

  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})
  const [studentId, setStudentId]= useState([])
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




  async function attendance() {
    try {
      const response = await fetch(`${BASE_URL}/attendance/get_attendance/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },
       

          body: JSON.stringify({date: "2024-05-01"}),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudentId(data.students)
      console.log(data.students)
      setIsLoading1(false); // Set loading state to false after data is fetched
    } catch (error) {
      toast.error('Error fetching data:', error);
      // Handle error here
      setIsLoading1(false); // Set loading state to false if an error occurs
    }
  }

  useEffect(()=>{

    
      
    
    fetchData();
    attendance()

    

  
  },[])



  return (

    <Row>

   
   {isLoading || isLoading1 ? 
   (
  <Loader/>
):
datas?
(
  datas.map((data) => (
    <Col sm="6" lg="4" key={data.id}>
      <TopCards
        bg="bg-light-success text-success"
        id  = {data.id}
        title={data.first_name}
        subtitle="Present"
        earning={`${data.first_name} ${data.last_name}`}
        icon="bi bi-people-fill"
      />
      
       { studentId.includes(data.id)?'pres':'miki'};

    </Col>
  ))
) :(<>
<h1>No Student is Assigned</h1>
</>)


}
   
  </Row>
 

  );
}

export default Home;
