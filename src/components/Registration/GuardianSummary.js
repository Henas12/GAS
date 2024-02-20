import { Card, Button, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import { useGuardianRegistrationMutation } from "../../slices/registrationApiSlice";
import Loader from "../../layouts/loader/Loader";
import { toast } from 'react-toastify';
import { UseDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom'
export default function GuardianSummary({ setPreview,  guardianFormData, guardianFormDatas,setGuardianFormData,setGuardianFormDatas,setNewGuardian }) {

  const handlePrevious = ()=>{
    setPreview(false)
    
   
  }

  const [ guardianRegistration, {isLoading}] = useGuardianRegistrationMutation()
  const {id: studentId} = useParams();


  

  const registerStudent  =async()=>{
    try {

      let valuesList = [];

      // Iterate over FormData entries
      for (const [key, value] of guardianFormDatas.entries()) {
        valuesList.push(value);
      }
      
      // Now valuesList contains all the values from the FormData object
      console.log(valuesList);



      const res = await guardianRegistration({studentId,guardianFormDatas}).unwrap();
      console.log('Backend response:', res);
      setPreview(false)
      setNewGuardian(false)
      setGuardianFormDatas(new FormData())
      const initialFormData = {
        username : '',
        image : null,
        first_name : '',
        last_name : '',
        phone_number : '',
        relationship : '',
      };
      setGuardianFormData(initialFormData)
      toast.success('Guardian is Registered')
     
   
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  
  }
  return( 
    
    <> 
    


    

    {isLoading && <Loader/>}
  
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

    

    <div className="d-flex justify-content-between">
   
          <Button  disabled={isLoading}  variant="secondary" onClick={handlePrevious}>
            Go back
          </Button>
       

       
          <Button   disabled={isLoading}  variant="primary" onClick={registerStudent}>
            Procceed
          </Button>
          
          </div>

  </CardBody>
</Card>
</div>
</div>





</>


    );
  };

  

