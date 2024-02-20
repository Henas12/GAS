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
  import Blog from "../../components/dashboard/Blog";
  import bg1 from "../../assets/images/bg/bg1.jpg";
  import bg2 from "../../assets/images/bg/bg2.jpg";
  import bg3 from "../../assets/images/bg/bg3.jpg";
  import bg4 from "../../assets/images/bg/bg4.jpg";
  import { useCreateLogMutation } from '../../slices/guardiansApiSlice';
  const BlogData = [
    {
      image: bg1,
      title: "This is simple blog",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
    {
      image: bg2,
      title: "Lets be simple blog",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
    {
      image: bg3,
      title: "Don't Lamp blog",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
    {
      image: bg4,
      title: "Simple is beautiful",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
  ];
  

function Mystudents() {
  const cardstyle = {
    backgroundColor: 'lightgray',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)'
  }

  const navigate = useNavigate()
  const { myData } = useMyContext();
console.log(myData)
const [createLog, {isLoading}] = useCreateLogMutation()


const logHandler =async(studentId)=>{
  let mydata= {"guardian_id":myData.id,
               "student_id":studentId
  }
   
     const res = await createLog(mydata)
     console.log(res)
}


  return (
    <>
  <Card>

   
  <Row>
     
        <h1 className="mb-5 mt-3 text-center">Students</h1>
    
      {myData.students.map((student, index) => (
        <Col md="6" lg="4" key={student.id}>
          {isLoading ? (
            <Loader />
          ) : (
            <Card style={cardstyle}>
              <CardImg alt="Card image cap" src={student.image} style={{ width: '100%', height: '250px' }} />
              <CardBody className="p-4">
                <CardTitle tag="h5">{student.first_name} {student.last_name}</CardTitle>
                <CardSubtitle>{student.class_name}</CardSubtitle>
                <Button color='primary' onClick={() => logHandler(student.id)}>Take</Button>
              </CardBody>
            </Card>
          )}
        </Col>
      ))}
    </Row>
  <Button onClick={()=>navigate('/home')}>Go Back</Button>
    </Card>
    
    </>
  );
}
export default Mystudents