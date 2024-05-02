


import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './layouts/parentHeader';


const GuardianBase = () => { 

  const location = useLocation();
  const hideSidebar = location.pathname.startsWith('/home') ||location.pathname.startsWith('/login')
  const hideHeader = location.pathname.startsWith('/login');
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

export default GuardianBase