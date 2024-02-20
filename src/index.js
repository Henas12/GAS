import { MyContextProvider } from './components/MyContext';
import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
// import './assets/styles/bootstrap.custom.css'
import store from './store';
import "./assets/scss/style.scss";
import Starter from './views/Starter';
import FullLayout from './layouts/FullLayout';
import Student from './views/ui/Student';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Router,
    Routes,
    RouterProvider
  } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import About from './views/About';
import Alerts from './views/ui/Alerts';
import Badges from './views/ui/Badges';
import Buttons from './views/ui/Buttons';
import Cards from './views/ui/Cards';
import Grid from './views/ui/Grid';
import Tables from './views/ui/Tables';
import Breadcrumbs from './views/ui/Breadcrumbs';
import Forms from './views/ui/Forms';
import Registration from './views/ui/Registration'
import { Home } from './views/ui/Home';
import Test from './views/ui/test';
import MultiStepForm from './views/ui/Form';
import GuardianForm from './views/ui/GuardianForm';
import Students from './views/ui/Students';
import Apps from './views/ui/Apps';
import Guardians from './views/ui/Guardians';
import Guardian from './views/ui/Guardian';
import Mystudents from './views/ui/MyStudent';
import Login from './views/Staff';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import New from './views/ui/new';



const router = createBrowserRouter(
    createRoutesFromElements(
      <>
          <Route path='/' element={<App />}>
            <Route path='/students/:id' element={<Student />} /> 
            <Route path='/:id/guardian_registration' element={<GuardianForm />} /> 
            <Route path='/students' element={<Students />} /> 
            <Route path='/guardians' element={<Guardians />} />
            <Route path='/guardians/:id' element={<Guardian />} />
            <Route path='/app' element={<Apps />} /> 
            <Route path='/student_registration' element={<MultiStepForm />} /> 
           
            <Route path='/mykid' element={<Mystudents />} /> 
           
            <Route path='/starter' element={<Starter />} /> 
            <Route path='/about' element={<About />} /> 
            <Route path='/badges' element={<Badges />} /> 
            <Route path='/buttons' element={<Buttons />} /> 
            <Route path='/cards' element={<Cards />} /> 
            <Route path='/table' element={<Tables />} /> 
            <Route path='/breadcrumbs' element={<Breadcrumbs />} /> 
            <Route path='/grid' element={<Grid />} /> 
            <Route path='/register' element={<Registration />} />   
            <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} /> 
          </Route>

    
          <Route path='/' element={<New />}> 
        
          <Route path='/staff-login' element={<Login />} /> 
          <Route path='/test' element={<Test />} /> 
          </Route>
   

          </>    
  ));
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
       <Provider store={store}>
       <MyContextProvider>
       <AuthProvider>
            <RouterProvider router={router} />
            </AuthProvider>
            </MyContextProvider>
            </Provider>
    </React.StrictMode>
  );




