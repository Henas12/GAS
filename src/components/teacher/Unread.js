

import React, { useState, useEffect } from 'react';
import { Button,Card, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../dashboard/StudentsCard';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { toast } from 'react-toastify';
function Unread() {

  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);

  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})
  const [studentId, setStudentId]= useState([])
  async function fetchData() {
    try {
      const response = await fetch(`${BASE_URL}/contact_book/contact_book_hrt/`, {
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
      let contactBookInfo = data.filter(contactBook => contactBook.is_read_p === false)
      setDatas(contactBookInfo);
      console.log(contactBookInfo)
      setIsLoading(false); 
    } catch (error) {
      toast.error('Error fetching data:', error);
    
      setIsLoading(false); 
    }
  }








 


  

  useEffect(()=>{

    
      
    
    fetchData();
    

    

  
  },[])



  return (


    

   <div>
  <h2 className="text-center mb-4" style={{ borderBottom: '1px solid black', paddingBottom: '8px' }}>Unread Contact Book</h2>
  <Row>
    {isLoading  ? (
      <Loader/>
    ) : (
      datas.length > 0 ? (
        datas.map((data) => (
          <Col sm="6" lg="8" key={data.id}>
            <TopCards
              bg="bg-light-success text-success"
              user='teacher'
              id={data.id}
              teacher={data.is_read_t}
              parent = {data.is_read_p}
              date = {data.date_time}
              title={`${data.student.first_name} ${data.student.last_name}`}
              subtitle={data.teacher_comment?.substring(0, 150)}
              earning={`${data.student.first_name} ${data.student.last_name}`}
              icon={data.student.image}
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

export default Unread;
