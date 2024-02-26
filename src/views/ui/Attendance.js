import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import Loader from "../../layouts/loader/Loader";
import { useGetStudentsQuery} from "../../slices/studentApiSlice";
import { useUpdateStudentMutation } from "../../slices/studentApiSlice";
import {toast} from 'react-toastify'
const Attendance = () => {

  const {data, isLoading, error, refetch} = useGetStudentsQuery()
  const [updateStudent, {isLoading: updateLoaing}] = useUpdateStudentMutation()

    const attendance =async(studentId)=>{

      const dataToSend ={'is_present':true}
      try{

          
        const res =  await updateStudent({studentId,dataToSend})

        refetch()
    }
    catch(error){
        toast.error(error?.data?.message ||error?.data?.detail)
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
                  <th>Satus</th>
                </tr>
              </thead>
              <tbody>
              {data.map((student,index) => (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>
                    <input type="checkbox" id="checkbox" name="checkbox" onClick={()=>attendance(student.id)}/>
                  </td>
                </tr>))}
                
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-3*/}
      {/* --------------------------------------------------------------------------------*/}
     
    </Row>)
  );
};

export default Attendance;
