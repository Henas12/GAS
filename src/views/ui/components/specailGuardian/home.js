

import React, { useState, useEffect,useContext } from 'react';
import { Button, Modal, Row,Col } from 'react-bootstrap';
import TopCards from '../../components/dashboard/ParentCard';
import AuthContext from '../../context/AuthContext';
import { BASE_URL } from '../../constants';
function Home() {

  let{authTokens}= useContext(AuthContext)
  useEffect(()=>{
    student()
  },[])

  let student = async()=> {
    let response =  await fetch(`${BASE_URL}/students/`, {
      method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + String(authTokens.access),
      'Content-Type': 'application/json',


    },
  }
  );
let data = await response.json()
  console.log(data)
  console.log(authTokens.access)
}
  return (
    
    <Row>
   

    
    <Col sm="6" lg="8">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>
    <Col sm="6" lg="8">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>
    <Col sm="6" lg="8">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>
    <Col sm="6" lg="8">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>
    <Col sm="6" lg="8">
      <TopCards
        bg="bg-light-success text-success"
        title="Students"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."
        earning="Henok Demeke"
        icon="bi bi-people-fill"
      />
    </Col>

    
    
  </Row>

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










