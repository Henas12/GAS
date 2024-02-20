import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { setstaff } from '../slices/staffSilce';
import { UseDispatch, useDispatch } from 'react-redux';
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
    let response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });


    let userInfo = await fetch('http://127.0.0.1:8000/auth/users/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    let data = await response.json();
    if (response.status === 200) {
      console.log(response)
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigateTo('/home'); // Redirect to home page upon login
    } else {
      toast.error('Invalid Credential!');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    // navigateTo('/staff-login'); // Redirect to login page upon logout
  };

  const updateToken = async () => {

    let response = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });

    const response1 = await fetch('http://127.0.0.1:8000/auth/users/me/', {
    method: 'GET',
    // You can include headers if required
    headers: {
      'Authorization': 'Bearer YourAccessToken',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response1.ok) {
    throw new Error('Network response was not ok');
  }
  
  const userInfo = await response1.json();
  dispatch({...userInfo})
  
    let data = await response.json();
    if (response.status === 200) {
      
      setAuthTokens((prevTokens) => ({
        ...prevTokens,
        access: data.access,
      }));
   
      setUser(jwtDecode(data.access));
      
      
      localStorage.setItem('authTokens', JSON.stringify({refresh: authTokens.refresh,access: data.access}));
      console.log(user)
     
    } else {
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

    const fourMinutes = 1000 * 4 ;

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
