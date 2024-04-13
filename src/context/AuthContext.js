import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { setstaff,resetstaff } from '../slices/staffSilce';
import {  useDispatch } from 'react-redux';
import { BASE_URL } from '../constants';
const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null
  );
  const [loading, setLoading] = useState(true);
  const navigateTo = (path) => {
    window.location.href = path;
  };
  const loginUser = async (username, password) => {
    let response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    let data = await response.json();
    let response1 = await fetch(`${BASE_URL}/auth/users/me/`, {
      method: 'GET',
      headers: {
        'Authorization':  `Bearer ${ data.access}`,
        'Content-Type': 'application/json',
      },
    });
    const userInfo = await response1.json(); 
     if (response.status === 200) {
      console.log(response)
      setAuthTokens(data);
      setUser(jwtDecode(data.access));     
      localStorage.setItem('authTokens', JSON.stringify(data));
      const userInfo = {
        "id":user?.user_id,
        "first_name":"Henok",
        "last_name":'Deme',
        "username":"hena",
        "is_staff": true,
        "is_superuser":false,
        "email":"hena@gmail.com", 
      }
        dispatch(setstaff({...userInfo}))
      navigateTo('/home'); // Redirect to home page upon login
    } else {
      toast.error('Invalid Credential!');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    dispatch(resetstaff())
    localStorage.removeItem('authTokens');
    // navigateTo('/staff-login'); // Redirect to login page upon logout
  };
  const updateToken = async () => {
    let response = await fetch(`${BASE_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    let data = await response.json();

    
    // const response1 = await fetch(`${BASE_URL}/auth/users/me/`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization':  `Bearer ${ data.access}`,
    //     'Content-Type': 'application/json',
  
    
    //   }
    // });
    // if (!response1.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // const userInfo = await response1.json();
  
    if (response.status === 200) {
      
      setAuthTokens((prevTokens) => ({
        ...prevTokens,
        access: data.access,
       

      }));
   
      setUser(jwtDecode(data.access));
      
      localStorage.setItem('authTokens', JSON.stringify({refresh: authTokens.refresh,access: data.access}));
      console.log(user)
      const userInfo = {
        "id":user.user_id,
        "first_name":"Henok",
        "last_name":'Deme',
        "username":"hena",
        "is_staff": true,
        "is_superuser":false,
        "email":"hena@gmail.com",
      
      }
        dispatch(setstaff({...userInfo}))
    } else {
      dispatch(resetstaff())
      logoutUser();
    }

 

    if (loading) {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (loading) {
      updateToken();
    }
    const fourMinutes = 1000 * 4 *60;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);
  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
