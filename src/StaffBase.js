


import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './layouts/StaffHeader';
import Sidebar from './layouts/Sidebar';
import { Routes, Route } from 'react-router-dom';
const StaffBase = () => { 

  const location = useLocation();
  const hideSidebar = location.pathname.startsWith('/home') ||location.pathname.startsWith('/staff-login')
  const hideHeader = location.pathname.startsWith('/staff-login');
  // || location.pathname.includes('forms');

  return (
    <>
  <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
          
       
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          {(!hideHeader && <Header />)}
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
      <ToastContainer/>
    </main>
  
   

    </>
  )
}

export default StaffBase