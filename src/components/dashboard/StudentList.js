import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";


import React, { useState, useEffect } from 'react';




const TopCards = (props) => {

const navigate = useNavigate()

  



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



<button className="btn btn-sm btn-primary" style={{marginLeft:'10px'}}  onClick={() => { navigate(`/teacher/${props.id}`) }}>Fill Out Form</button>

      </div>
 
</CardBody>

</Card>
  );
};

export default TopCards;