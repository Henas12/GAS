import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";


import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import Loader from '../../layouts/loader/Loader';
import { useParams } from 'react-router-dom';



const TopCards = (props) => {



  const [isLoading, setIsLoading] = useState(false);

  let{authTokens}= useContext(AuthContext)
  const [datas, setDatas]= useState({})
  const navigate = useNavigate()

  async function MarkAsRead() {
    try {
      const response = await fetch(`${BASE_URL}/contact_book/contact_book_hrt/`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + String(authTokens.access),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({'cb_id':props.id})
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
   
      setIsLoading(true); 
      toast.success('Marked As Read')
      props.fetchData()    } catch (error) {
      toast.error('Error fetching data:', error);
    
      setIsLoading(false); 
    }
  }




  return (
<Card>
<CardBody>
  <div className="d-flex">
    <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
      <img src={`${BASE_URL}${props.icon}`}  
           className="rounded-circle"
           alt="ava"
           width="45"
           height="45"/>
    </div>
    <div className="ms-3">
      <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
      <p className="mb-0">{props.date?.split('T')[0]}</p>
      <small className="text-muted">{props.subtitle}</small> {/* Include small tag here */}
    </div>
  </div>

 
    <div className="d-flex justify-content-end mt-3">
    {!props.parent  &&
      <button className="btn btn-sm btn-primary" disabled={isLoading} onClick={() => { navigate(`/parent/contact-book/${props.id}`) }}>Fill the From</button>
   
    }
  
  
{ !props.parent &&    <Button className="btn" color="danger" style={{marginLeft:'10px'}}  disabled onClick={MarkAsRead}>Unreviewed Form</Button>
    }

{ props.parent &&
<button className="btn btn-sm btn-primary" style={{marginLeft:'10px'}}  onClick={() => { navigate(`/parent/student/contact-book/${props.id}`) }}>Read The Form</button>
 }
      </div>
 
</CardBody>

</Card>
  );
};

export default TopCards;