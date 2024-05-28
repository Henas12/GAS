import { useMyContext } from '../../components/MyContext';
import { useGradeQuery } from '../../slices/studentApiSlice';
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
import { useEffect } from 'react';  
import { useContext } from 'react';
import { BASE_URL } from '../../constants';
import AuthContext from '../../context/AuthContext';
function Mystudents() {

  const cardstyle = {
    
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.8)'
  }
  const { id: guardianId } = useParams();
  
  const {data, isLoading:guardianIsLoading, error, refetch} = useGetSingleGuardianQuery(guardianId)



  let{authTokens}= useContext(AuthContext)
  const navigate = useNavigate()


const [createLog, {isLoading}] = useCreateLogMutation()

const handleClick = () => {
  window.history.back();
  
 
};

const logHandler =async(studentId)=>{
  let mydata= {"guardian_id":guardianId,
               "student_id":studentId
  }

  try {
    const response = await fetch(`${BASE_URL}/verify/create_log/`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + String(authTokens.access),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mydata),
    });
    toast.success(response?.data?.message)

    refetch()
  }
  catch{
    toast.error('Error')
    refetch()
  }
   
    
   
   
}

useEffect(()=>{
if(!guardianIsLoading){
  console.log(data)
}

},[guardianIsLoading])

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

                         
                        
                          <CardSubtitle>Grade: {student.grade.grade}        </CardSubtitle>

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