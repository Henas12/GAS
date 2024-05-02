

import React, { useState, useEffect,useContext } from 'react';
import { Button, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../../components/dashboard/ParentCard';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
import Loader from '../../layouts/loader/Loader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function Home() {

  const{id: studentId} = useParams()
  const [refetch, setRefetch]= useState(true)
    const [isLoading, setIsLoading] = useState(true);
  
    let{authTokens}= useContext(AuthContext)
    const [datas, setDatas]= useState({})
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/contact_book/contact_book_parent/`, {
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
  {!isLoading && <h2 className="text-center mb-4" style={{ borderBottom: '1px solid black', paddingBottom: '8px' }}>My Kids</h2> }
  <Row>
    {isLoading  ? (
      <Loader/>
    ) : (
      datas.length > 0 ? (
        datas.map((data) => (
          <Col sm="6" lg="8" key={data.id}>
            <TopCards
              bg="bg-light-success text-success"
             
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

export default Home;





// import { useState, useEffect } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
// import { useNavigate, useLocation } from "react-router-dom";

// const Users = () => {
//     const [users, setUsers] = useState();
//     const axiosPrivate = useAxiosPrivate();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         let isMounted = true;
//         const controller = new AbortController();

//         const getUsers = async () => {
//             try {
//                 const response = await axiosPrivate.get('/students/', {
//                     signal: controller.signal
//                 });
//                 console.log(response.data);
//                 isMounted && setUsers(response.data);
//             } catch (err) {
//                 console.error(err);
//                 navigate('/login');
//             }
//         }

//         getUsers();

//         return () => {
//             isMounted = false;
//             controller.abort();
//         }
//     }, [])

//     return (
//         <article>
//             <h2>Users List</h2>
//             {users?.length
//                 ? (
//                     <ul>
//                         {users.map((user, i) => <li key={i}>{user?.username}</li>)}
//                     </ul>
//                 ) : <p>No users to display</p>
//             }
//         </article>
//     );
// };

// export default Users;










