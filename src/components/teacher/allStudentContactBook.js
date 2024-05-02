import React, { useState, useEffect } from 'react';
import { Button,Card, Modal, Row,Col } from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { useNavigate } from 'react-router-dom';
function ContactTable() {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true);
  
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
        // toast.error('Error fetching data:', error);
        // Handle error here
        setIsLoading(false); // Set loading state to false if an error occurs
      }
    }

  

    useEffect(()=>{

    
      
    
        fetchData();
    
        
    
      
      },[])




  return (
(isLoading? <Loader/>: <div className="container" >
<h1 className="text-center mt-4 mb-4">Contact Table</h1>
<input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
      />
<table className="table table-bordered table-hover table-striped m-3">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Gender</th>
      <th scope="col">More</th>
      <th scope="col">Image</th>
    </tr>
  </thead>
  <tbody>
    {datas.map((contact, index) => (
      <tr key={index}>
        <td>{contact.first_name}</td>
        <td>{contact.last_name}</td>
        <td>{contact.gender}</td>
        <td><Button className="btn btn-info" onClick={()=>navigate(`/teacher/contact-book/${contact.id}`)}>More</Button></td>
        <td><img src={`${BASE_URL}${contact.image}`} alt={`Image of ${contact.first_name}`} style={{ width: '50px', height: '50px' }} /></td>
      </tr>
    ))}
  </tbody>
</table>
</div> )
   
  );
}




export default ContactTable;
