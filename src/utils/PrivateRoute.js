import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './auth'; // Assuming you have an authentication context

    const PrivateRoute = ({children, ...rest}) => {
        return(
            <Route {...rest}>{children}</Route>
        )
    }
    
  
  
  

export default PrivateRoute;
