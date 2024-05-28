import { MyContextProvider } from './components/MyContext';
import React, { Component } from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import store from './store';
import "./assets/scss/style.scss";
import Starter from './views/Starter';
import FullLayout from './layouts/FullLayout';
import Student from './views/ui/Student';
import Search from './components/Registration/Search';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Router,
    Routes,
    RouterProvider
  } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import StudentUpdate from './components/student/Update';
import { Provider } from 'react-redux';
import Badges from './views/ui/Badges';
import Buttons from './views/ui/Buttons';
import Cards from './views/ui/Cards';
import Grid from './views/ui/Grid';
import Tables from './views/ui/Tables';
import Breadcrumbs from './views/ui/Breadcrumbs';
import Forms from './views/ui/Forms';
import Registration from './views/ui/Registration'
import Home  from './views/ui/Home';
import Test from './views/ui/test';
import THome from './components/teacher/home'
import MultiStepForm from './views/ui/Form';
import GuardianForm from './views/ui/GuardianForm';
import Students from './views/ui/Students';
import ContactForm from './components/teacher/ContactForm';
import Apps from './views/ui/Apps';
import StaffBase from './StaffBase';
import Guardians from './views/ui/Guardians';
import Guardian from './views/ui/Guardian';
import Mystudents from './views/ui/MyStudent';
import Login from './views/Staff';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import New from './views/ui/new';
import AdminRoute from './utils/AdminRoute';
import Profile from './views/ui/Profile';
import HrtBase from './HrtBase'
import GuardianUpdate from './components/guardian/GuardianUpdate';
import GuardianBase from './GuardianBase';
import GuardianHome from './components/specailGuardian/home'
import VideoRecorder from './views/ui/video';
import HomeRTForm from './components/users/homeroomTeacher/HomeRTForm';
import AuthenticatorForm from './components/users/authenticator/AuthenticatorForm';
import ParentRegistrationForm from './components/users/parent/ParentForm';
import ParentForm from './views/parentAssignment/ParentForm';
import TeacherRoute from './utils/HomeRoomTeacher';
import Attendance from './components/teacher/Attendance';
import ActivationPage from './components/Activate'
import Parents from './views/ui/Parents'
import Parent from './views/ui/Parent';
import Teachers from './views/ui/Teachers';
import Teacher from './views/ui/Teacher';
import Authenticator from './views/ui/Authenticator';
import Authenticators from './views/ui/Authenticators';
import Unread from './components/teacher/Unread';
import ContactTable from './components/teacher/allStudentContactBook';
import SpecficStudent from './components/teacher/SpecficStudent';
import ContactDetail from './components/teacher/ContactDetail';
import ContactFormParent from './components/specailGuardian/ContactFormParent';
import ContactDetailParent from './components/specailGuardian/ContactDetailParent';
import UnreadParent from './components/specailGuardian/Unread';
import ParentRoute from './utils/Parent';
import Home1 from './Landing/pages/Home'

const router = createBrowserRouter(
    createRoutesFromElements(
      <>

<Route path='/' element={<Home1 />} /> 
          <Route path='/' element={<App />}>
          <Route path='/dashboard' element={<Starter />} /> 
          
          <Route path='/video' element={<VideoRecorder />} /> 
                   <Route path='/students/:id' element={<Student />} /> 
            <Route path='/:id/guardian_registration' element={<GuardianForm />} /> 
            <Route path='/:id/parent-assign' element={<ParentForm />} /> 
            <Route path='/students' element={<Students />} /> 
            <Route path='/parents' element={<Parents />} /> 
            <Route path='/guardians' element={<Guardians />} />
            <Route path='/teachers' element={<Teachers />} />
            <Route path='/teachers/:id' element={<Teacher />} />
            <Route path='/authenticators' element={<Authenticators />} />
            <Route path='/authenticators/:id' element={<Authenticator />} />
            <Route path='/guardians/:id' element={<Guardian />} />
            <Route path='/parents/:id' element={<Parent />} />
            <Route path='/app' element={<Apps />} /> 
            <Route path='/student_registration' element={<MultiStepForm />} /> 
            <Route path='/students/update/:id' element={<StudentUpdate />} /> 
            <Route path='/guardians/update/:id' element={<GuardianUpdate />} /> 
            <Route path='/mykid' element={<Mystudents />} /> 
            <Route path='/attendance' element={<Attendance />} /> 
            <Route path='/badges' element={<Badges />} /> 
            <Route path='/buttons' element={<Buttons />} /> 
            <Route path='/cards' element={<Cards />} /> 
            <Route path='/table' element={<Tables />} /> 
            <Route path='/breadcrumbs' element={<Breadcrumbs />} /> 
            <Route path='/grid' element={<Grid />} /> 
            <Route path="/register" element={<AdminRoute><Registration/></AdminRoute>} /> 
            {/* <Route path='/register' element={<Registration />} />    */}
          </Route>   


        

          
          <Route path='/' element={<New />}> 
          
          <Route path='/activate' element={<ActivationPage />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/parent-register' element={<ParentRegistrationForm />} /> 
          <Route path='/teacher-register' element={<HomeRTForm />} /> 
          <Route path='/authenticator-register' element={<AuthenticatorForm />} /> 
       

          

          
          </Route>

<Route path='/' element={<StaffBase />}> 
<Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} /> 
<Route path='/mykid/:id' element={<Mystudents />} /> 
{/* <Route path='/staff/attedance/' element={<Attendance />} />  */}
<Route path='/profile' element={<Profile />} /> 
{/* <Route path='/test' element={<Test />} />  */}
</Route>

<Route path='/teacher' element={<HrtBase />}> 
<Route path='/teacher/home' element=  { <TeacherRoute> <THome /></TeacherRoute> } /> 
<Route path='/teacher/:id' element={ <TeacherRoute><ContactForm /> </TeacherRoute>} /> 
<Route path='/teacher/attendance/' element={<TeacherRoute> <Attendance /></TeacherRoute>} /> 
<Route path='/teacher/unread/' element={<TeacherRoute> <Unread /></TeacherRoute>} /> 
<Route path='/teacher/all/' element={<TeacherRoute> <ContactTable /></TeacherRoute>} /> 
<Route path='/teacher/search/' element={<TeacherRoute> <Search /></TeacherRoute>} /> 
<Route path='/teacher/contact-book/:id' element={<TeacherRoute> <SpecficStudent /></TeacherRoute>} /> 
<Route path='/teacher/student/contact-book/:id' element={<TeacherRoute> <ContactDetail /></TeacherRoute>} /> 

</Route>

<Route path='/parent' element={<GuardianBase />}> 
<Route path='/parent/home' element={<ParentRoute><GuardianHome/></ParentRoute> } /> 
<Route path='/parent/unread' element={<ParentRoute><UnreadParent/></ParentRoute>} /> 

<Route path='/parent/contact-book/:id' element={<ParentRoute><ContactFormParent/></ParentRoute>} /> 
<Route path='/parent/student/contact-book/:id' element={<ParentRoute><ContactDetailParent/></ParentRoute>} /> 


          

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
