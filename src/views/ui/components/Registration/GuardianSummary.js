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
      for (const [key, value] of guardianFormDatas.entries()) {
        valuesList.push(value);
      }
      
      console.log(valuesList);
      console.log(guardianFormDatas);



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
        gender : '',
        birthDate: '',
        address: '',
        user_photo_1: null,
        user_photo_2: null,
        user_photo_3: null
    
    
      };
      setGuardianFormData(initialFormData)
      toast.success('Guardian is Registered')
     
   
    } catch (err) {
      
      toast.error(err?.detail) 
      toast.error(err?.data?.message || (err.data?.username?err.data?.username[0]:`${err?.data?.detail}`));
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
             Gender
            </td>
            <td>{guardianFormData.gender}</td>
       
           
          </tr>


          <tr  className="border-top">
            <td>
             Birth Date
            </td>
            <td>{guardianFormData.birthDate}</td>
       
           
          </tr>


          <tr  className="border-top">
            <td>
            Relationshipr
            </td>
            <td>{guardianFormData.relationship}</td>
       
           
          </tr>
   
          <tr  className="border-top">
            <td>
             Address
            </td>
            <td>{guardianFormData.address}</td>
       
           
          </tr>
    
          <tr  className="border-top">
          <td>Image 1</td>
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={guardianFormData.user_photo_1}
                  alt="avatar"
                  width="100"
                  height="150"
                />
                
              </div>
            </td>
           
       
           
          </tr> <tr  className="border-top">
          <td>Image 2</td>
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={guardianFormData.user_photo_2}
                  alt="avatar"
                  width="100"
                  height="150"
                />
                
              </div>
            </td>
           
       
           
          </tr>
        
          <tr  className="border-top">
          <td>Image 3</td>
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={guardianFormData.user_photo_3}
                  alt="avatar"
                  width="100"
                  height="150"
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

  
