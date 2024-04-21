import { Card, Button, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import { useStudentRegistrationMutation } from "../../slices/registrationApiSlice";
import Loader from "../../layouts/loader/Loader";
import { toast } from 'react-toastify';


const StudentSummary = ({setPreview, setStep, formData, formDatas }) => {

  const handlePrevious = ()=>{
    setPreview(false)
    setStep(2)
  }
  const [studentRegistration, {isLoaing}] = useStudentRegistrationMutation()


  const registerStudent  =async()=>{
    try {
     
     
      let valuesList = [];

      // Iterate over FormData entries
      for (const [key, value] of formDatas.entries()) {
        valuesList.push(value);
      }
      
      // Now valuesList contains all the values from the FormData object
      console.log(valuesList);
 
      
      const res = await studentRegistration(formDatas).unwrap();
      console.log('Backend response:', res);
      setPreview(false)
      setStep(3)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  
  }
  return( 
    
    <>   
    


  
  <div className="row h-100 justify-content-center align-items-center">
<div className="col-md-8">
  <Card style={{ maxWidth: '90%' }}>
  <CardBody>
    <CardTitle tag="h5">Review</CardTitle>
    <CardSubtitle className="mb-2 text-muted" tag="h6">
      Review User Information Before Proceeding
    </CardSubtitle>

    <Table className="no-wrap mt-3 align-middle" responsive borderless>
      <thead>
        <tr>
          <th>Input Field</th>
          <th>User Value</th>
        </tr>
      </thead>
      <tbody>

      <tr  className="border-top">
            <td>
             First Name
            </td>
            <td>{formData.firstName}</td>
          </tr>

          <tr  className="border-top">
            <td>
             Last Name
            </td>
            <td>{formData.lastName}</td>
       
           
          </tr>

          <tr  className="border-top">
            <td>
             Birth Date
            </td>
            <td>{formData.birthDate}</td>
       
           
          </tr>
   

    
          <tr  className="border-top">
          <td>Image</td>
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={formData.image}
                  className="rounded-circle"
                  alt="avatar"
                  width="60"
                  height="100"
                />
                
              </div>
            </td>
           
       
           
          </tr>
   
      </tbody>
    </Table>



    <div className="d-flex justify-content-between">
     

     {isLoaing? <Loader/> : <> <Button variant="secondary" onClick={handlePrevious}>
            Go back
          </Button>
       

       
          <Button variant="primary" onClick={registerStudent}>
            Procceed
          </Button>
          </>
  }
          
          </div>
  </CardBody>
</Card>
</div>
</div>




</>


    );
  };


export default StudentSummary;
