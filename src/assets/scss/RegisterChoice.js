import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
// import './choigit ce.css'
import logo from '../images/logos/logo.svg'
import { useNavigate } from 'react-router-dom';


function RegisterChoice() {
    
    const navigate = useNavigate()
  
  return (
    <div class="login-container">
    <div class="auth-wrapper">
      <div class="auth-inner">
      <div className="auth">
      <img src={logo} alt="Bright School Logo" />
            </div>
           
            
        <button class="auth-button" id="authenticator"  onClick={() => navigate('/authenticator-register')}
 >Register as Authenticator</button>
        <button class="auth-button" id="teacher"  onClick={()=> navigate('/teacher-register')}>Register as Teacher</button>
      </div>
    </div>
  </div>
  
  );
  
}

export default RegisterChoice;
