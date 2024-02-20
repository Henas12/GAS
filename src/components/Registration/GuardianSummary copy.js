import { Card, Button, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import { useGuardianRegistrationMutation } from "../../slices/registrationApiSlice";
import Loader from "../../layouts/loader/Loader";
import { toast } from 'react-toastify';

export default function GuardianSummary({setGuardianPreview, setStep, guardianFormData, guardianFormDatas }) {

  const handlePrevious = ()=>{
    setGuardianPreview(false)
    setStep(3)
  }
  const [ guardianRegistration, {isLoaing}] = useGuardianRegistrationMutation()
  
  

 
 
  

  const registerStudent  =async()=>{
    try {
     
      
      let valuesList = [];

      // Iterate over FormData entries
      for (const [key, value] of guardianFormDatas.entries()) {
        valuesList.push(value);
      }
      
      // Now valuesList contains all the values from the FormData object
      console.log(valuesList);

      const res = await guardianRegistration(guardianFormDatas).unwrap();
      console.log('Backend response:', res);
      setGuardianPreview(false)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  
  }
  return( 
    
    <>    {isLoaing? (<Loader/>):
(
  
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
            <td>{guardianFormData.first_name}</td>
          </tr>

          <tr  className="border-top">
            <td>
             Last Name
            </td>
            <td>{guardianFormData.last_name}</td>
       
           
          </tr>

          <tr  className="border-top">
            <td>
             Username
            </td>
            <td>{guardianFormData.username}</td>
       
           
          </tr>
          <tr  className="border-top">
            <td>
             Phone Number
            </td>
            <td>{guardianFormData.phone_number}</td>
       
           
          </tr>


          <tr  className="border-top">
            <td>
            Relationshipr
            </td>
            <td>{guardianFormData.relationship}</td>
       
           
          </tr>
   

    
          <tr  className="border-top">
          <td>Image</td>
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={guardianFormData.image}
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
    {isLoaing? (<Loader/>):
    <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePrevious}>
            Go back
          </Button>       
          <Button variant="primary" onClick={registerStudent}>
            Procceed
          </Button>

          </div>}
  </CardBody>
</Card>
</div>
</div>)



}
</>


    );
  };

  

