

import React, { useState, useEffect } from 'react';
import { Button,Card, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../dashboard/StudentsCard';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function SpecficStudent() {
const{id: studentId} = useParams()
const [refetch, setRefetch]= useState(true)
  const [isLoading, setIsLoading] = useState(true);

  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})
  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/contact_book/contact_book_hrt/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({'info_type':"student",'student_id':studentId})
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDatas(data);
      console.log(data)
      setIsLoading(false); 
    } catch (error) {
      toast.error('Error fetching data:', error);
    
      setIsLoading(false); 
    }
  }




 


  

  useEffect(()=>{

    
      
    
    fetchData();
    

    

  
  },[refetch,setRefetch])



  return (


    

   <div>
  {!isLoading && <h2 className="text-center mb-4" style={{ borderBottom: '1px solid black', paddingBottom: '8px' }}>{datas[0]?.student.first_name} {datas[0]?.student.last_name}</h2> }
  <Row>
    {isLoading  ? (
      <Loader/>
    ) : (
      datas.length > 0 ? (
        datas.map((data) => (
          <Col sm="6" lg="8" key={data.id}>
            <TopCards
              bg="bg-light-success text-success"
              teacher={data.is_read_t}
              parent = {data.is_read_p}
              id={data.id}
              title={`${data.student.first_name} ${data.student.last_name}`}
              date = {data.date_time}
              subtitle={data.teacher_comment?.substring(0, 150)}
              earning={`${data.student.first_name} ${data.student.last_name}`}
              icon={data.student.image}
              fetchData ={fetchData}
            />
          </Col>
        ))
      ) : (
        <h1 className="text-center">No data available</h1>
      )
    )}
  </Row>
</div>





  );
}

export default SpecficStudent;
