import ProjectTables from "../dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody,Button } from "reactstrap";
import Loader from "../../layouts/loader/Loader";
import {toast} from 'react-toastify'
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../constants";
import { useContext,useState,useEffect } from "react";
const Attendance = () => {

  
  const [isLoading, setIsLoading] = useState(true);
  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})
  const [student, setStudent] =  useState({})

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



  const attendance = (student_id, index) => {

    if (student[index] !== undefined) {
      // If the index is already assigned, remove the student
      setStudent((prev) => {
        const updatedStudent = { ...prev };
        delete updatedStudent[index]; // Remove the student at the specified index
        return updatedStudent;
      });
      console.log(`Student at index ${index} is removed.`);
      
      return;
 
  };
    setStudent((prev) => ({
      ...prev,
      [index]: student_id // Use computed property names to set the property dynamically
    }));
  };

  const handleAttendance= async()=>{
    try {

    const response = await fetch(`${BASE_URL}/hrts/take_attendance/`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });
  }
  catch (error) {
    toast.error(' Error taking Attendance ');
    // Handle error here
  }
}



  return (

    isLoading?<Loader/>: 
   ( <Row>
    <Col lg="12">
      <Card>
        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
          <i className="bi bi-card-text me-2"> </i>
           Attendance
        </CardTitle>
        <CardBody className="">
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th> {/* Corrected typo: "Status" */}
              </tr>
            </thead>
            <tbody>
              {datas.map((student, index) => (
                <tr key={index}> {/* Added key prop to each <tr> */}
                  <th scope="row">{index + 1}</th>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>
                    <input type="checkbox" id={`checkbox_${index}`} name={`checkbox_${index}`} onClick={() => attendance(student.id, index)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Button added below the table */}
          <Button onClick={handleAttendance}>Submit</Button>
        </CardBody>
      </Card>
    </Col>
  </Row>
  )
  );
};

export default Attendance;
