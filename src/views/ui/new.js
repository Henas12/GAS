


import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../layouts/StaffHeader';

const New = () => { 




  return (
    <>

      

            <Outlet />
    
         
      <ToastContainer/>
    

    </>
  )
}

export default New