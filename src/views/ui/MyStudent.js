import { useMyContext } from '../../components/MyContext';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Row,
    Col,
  } from "reactstrap";
  import { useNavigate } from 'react-router-dom';
  import Loader from "../../layouts/loader/Loader";
  import { FaArrowLeft } from 'react-icons/fa';
  import { useCreateLogMutation } from '../../slices/guardiansApiSlice';
import { toast } from 'react-toastify';
import { useGetSingleGuardianQuery } from '../../slices/guardiansApiSlice';
  import { useParams } from 'react-router-dom';
  

function Mystudents() {

  const cardstyle = {
    
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.8)'
  }
  const { id: guardianId } = useParams();
  console.log(guardianId)
  const {data, isLoading:guardianIsLoading, error, refetch} = useGetSingleGuardianQuery(guardianId)



  const navigate = useNavigate()
  const { myData } = useMyContext();
console.log(myData)
const [createLog, {isLoading}] = useCreateLogMutation()

const handleClick = () => {
  window.history.back();
  
 
};

const logHandler =async(studentId)=>{
  let mydata= {"guardian_id":guardianId,
               "student_id":studentId
  }
   
     const res = await createLog(mydata)
     toast.success(res?.data?.message)
     refetch()
     console.log(res)
}


  return (
    <>
 { guardianIsLoading ? (

            <Loader />
          ) : (<Card>

{/* <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <FaArrowLeft style={{ color: 'blue', fontSize: '24px' }} />
    </div> */}
            <Row>
               
                  <h1 className="mb-5 mt-3 text-center">Students</h1>
                {data.students.map((student, index) => (
                  <Col   md="6" lg="4" key={student.id} style={{ paddingLeft: '40px' }}>
                    {isLoading|| guardianIsLoading ? (
                      <Loader />
                    ) : (
                      <Card style={cardstyle}>
                    
                        <CardImg alt="Card image cap" src={student.image} style={{ width: '100%', height: '250px' }} />
                        <CardBody className="p-4">
                          <CardTitle tag="h5">Full Name: {student.first_name} {student.last_name}</CardTitle>
                          <CardSubtitle>Grade: {student.grade}        </CardSubtitle>
                          
                          { student.is_present &&<Button color='primary' onClick={() => logHandler(student.id)}>Take</Button>}
                        </CardBody>
          
                      </Card>
                    )}
                  </Col>

                ))}

                
                


              </Row>
              <div style={{display:'flex', justifyContent:'center'}}>
              <Button color='primary' onClick={()=>navigate('/home')} style={{width:"200px", height:"60px"}}>   <FaArrowLeft style={{  fontSize: '24px' }} /> Go Back</Button>
</div>
              </Card>)}


  
    
    </>
  );
}
export default Mystudents